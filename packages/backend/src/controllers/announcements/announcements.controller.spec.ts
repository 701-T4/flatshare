import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { House, HouseDocument } from '../../db/house/house.schema';
import { User, UserDocument } from '../../db/user/user.schema';
import { UserStoreService } from '../../db/user/userStore.service';
import { HouseStoreService } from '../../db/house/houseStore.service';
import {
  Announcement,
  AnnouncementDocument,
} from '../../db/announcement/announcement.schema';
import { AnnouncementUtil } from '../announcements/announcements.util';
import { AnnouncementStoreService } from '../../db/announcement/announcementStore.service';
import { getFakeUserToken, mockModel } from '../../util/testing.utils';
import { HouseUtil } from '../house/house.util';
import { AnnouncementController } from './announcements.controller';
import { Types } from 'mongoose';
import { AnnouncementResponseDto } from './dto/announcement-response.dto';

describe('announcementsController', () => {
  let controller: AnnouncementController;
  let userStoreService: UserStoreService;
  let houseStoreService: HouseStoreService;
  let announcementStoreService: AnnouncementStoreService;
  let announcementUtil: AnnouncementUtil;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnnouncementController],
      providers: [
        HouseStoreService,
        UserStoreService,
        AnnouncementStoreService,
        HouseUtil,
        AnnouncementUtil,
        {
          provide: getModelToken(User.name),
          useValue: mockModel,
        },
        {
          provide: getModelToken(House.name),
          useValue: mockModel,
        },
        {
          provide: getModelToken(Announcement.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    userStoreService = module.get<UserStoreService>(UserStoreService);
    houseStoreService = module.get<HouseStoreService>(HouseStoreService);
    announcementStoreService = module.get<AnnouncementStoreService>(
      AnnouncementStoreService,
    );
    controller = module.get<AnnouncementController>(AnnouncementController);
    announcementUtil = module.get<AnnouncementUtil>(AnnouncementUtil);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all announcements in house', async () => {
    const userToken = getFakeUserToken();
    const houseId = new Types.ObjectId();
    const houseCode = new Types.ObjectId().toString();

    const mockAnnouncement = {
      title: 'title',
      description: 'desc',
    };

    jest.spyOn(userStoreService, 'findOneByFirebaseId').mockResolvedValue({
      house: houseId,
      firebaseId: userToken.uid,
    } as UserDocument);

    jest.spyOn(userStoreService, 'findOne').mockResolvedValue({
      name: 'name',
    } as UserDocument);

    jest.spyOn(houseStoreService, 'findOne').mockResolvedValue({
      code: houseCode,
    } as HouseDocument);

    jest
      .spyOn(announcementUtil, 'convertAnnouncementDocumentToResponseDTO')
      .mockResolvedValue(mockAnnouncement as AnnouncementResponseDto);

    jest
      .spyOn(announcementStoreService, 'findAllByHouseCode')
      .mockResolvedValue([mockAnnouncement] as AnnouncementDocument[]);

    const returned = await controller.getAnnouncements(userToken);
    expect(returned).toEqual([mockAnnouncement]);
  });
});
