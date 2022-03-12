import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { HouseStoreService } from './houseStore.service';
import { House } from './house.schema';
import { Model } from 'mongoose';

const mockHouse = {
  name: 'House #1',
  email: 'whatever@gmail.com',
  address: 'Mars',
  code: 'lol',
};

describe('HouseStoreService', () => {
  let service: HouseStoreService;
  let model: Model<House>;

  const HousesArray = [
    {
      name: 'House #1',
      email: 'whatever@gmail.com',
      address: 'Mars',
      code: 'lol',
    },
    {
      name: 'House #2',
      email: 'Test2@gmail.com',
      address: 'Earth',
      code: 'lmao',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HouseStoreService,
        {
          provide: getModelToken('House'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockHouse),
            constructor: jest.fn().mockResolvedValue(mockHouse),
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HouseStoreService>(HouseStoreService);
    model = module.get<Model<House>>(getModelToken('House'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all Houses', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(HousesArray),
    } as any);
    const Houses = await service.findAll();
    expect(Houses).toEqual(HousesArray);
  });

  it('should return one house', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockHouse),
    } as any);
    const House = await service.findOneByCode('lol');
    expect(House).toEqual(mockHouse);
  });

  it('should insert a new House', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'House #1',
        email: 'whatever@gmail.com',
        address: 'Mars',
        code: 'lol',
      }),
    );
    const newHouse = await service.create({
      name: 'House #1',
      email: 'whatever@gmail.com',
      address: 'Mars',
      code: 'lol',
      owner: null,
    });
    expect(newHouse).toEqual(mockHouse);
  });
});
