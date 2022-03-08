import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserStoreService } from './userStore.service';
import { User } from './user.schema';
import { Model } from 'mongoose';

const mockUser = {
  name: 'User #1',
  age: 4,
};

describe('UserStoreService', () => {
  let service: UserStoreService;
  let model: Model<User>;

  const usersArray = [
    {
      name: 'User #1',
      age: 4,
    },
    {
      name: 'User #2',
      age: 2,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserStoreService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserStoreService>(UserStoreService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await service.findAll();
    expect(users).toEqual(usersArray);
  });

  it('should insert a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'User #1',
        age: 4,
      }),
    );
    const newUser = await service.create({
      name: 'User #1',
      age: 4,
    });
    expect(newUser).toEqual(mockUser);
  });
});
