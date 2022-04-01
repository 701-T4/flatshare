import { HttpException, HttpStatus } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { House } from '../../db/house/house.schema';
import { User, UserDocument } from '../../db/user/user.schema';
import { UserStoreService } from '../../db/user/userStore.service';
import { HouseStoreService } from '../../db/house/houseStore.service';
import { Announcement } from '../../db/announcement/announcement.schema';
import { AnnouncementUtil } from '../announcements/announcements.util';
import { AnnouncementStoreService } from '../../db/announcement/announcementStore.service';
import { getFakeUserToken, mockModel } from '../../util/testing.utils';
import { HouseController } from './house.controller';
import { HouseUtil } from './house.util';

describe('HouseController', () => {
  let controller: HouseController;
  let userStoreService: UserStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HouseController],
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
    controller = module.get<HouseController>(HouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return 204 with getHouse if user does not have a house linked', () => {
    const userToken = getFakeUserToken();
    jest.spyOn(userStoreService, 'findOneByFirebaseId').mockResolvedValue({
      house: undefined,
      firebaseId: userToken.uid,
    } as UserDocument);

    expect(() => controller.get(userToken)).rejects.toThrow(
      new HttpException('user is not in a house', HttpStatus.NO_CONTENT),
    );
  });
});
