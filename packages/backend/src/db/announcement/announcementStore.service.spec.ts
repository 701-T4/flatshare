/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AnnouncementStoreService } from './announcementStore.service';
import { Announcement } from './announcement.schema';
import { Model } from 'mongoose';

const mockAnnouncement = {
  title: 'title #1',
  description: 'description #1',
  author: null,
  houseCode: 'code #1',
};

describe('AnnouncementStoreService', () => {
  let service: AnnouncementStoreService;
  let model: Model<Announcement>;

  const AnnouncementArray = [
    {
      title: 'title #1',
      description: 'description #1',
      author: null,
      houseCode: 'code #1',
    },
    {
      title: 'title #2',
      description: 'description #2',
      author: null,
      houseCode: 'code #1',
    },
    {
      title: 'title #3',
      description: 'description #3',
      author: null,
      houseCode: 'code #3',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnnouncementStoreService,
        {
          provide: getModelToken('Announcement'),
          useValue: {
            new: jest.fn().mockResolvedValue(Announcement),
            constructor: jest.fn().mockResolvedValue(Announcement),
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AnnouncementStoreService>(AnnouncementStoreService);
    model = module.get<Model<Announcement>>(getModelToken('Announcement'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all Announcements', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(AnnouncementArray),
    } as any);
    const Announcement = await service.findAll();
    expect(Announcement).toEqual(AnnouncementArray);
  });

  it('should insert a new Announcement', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        title: 'title #1',
        description: 'description #1',
        author: null,
        houseCode: 'code #1',
      }),
    );
    const newAnnouncement = await service.create({
      title: 'title #1',
      description: 'description #1',
      author: null,
      houseCode: 'code #1',
    });
    expect(newAnnouncement).toEqual(mockAnnouncement);
  });
});
