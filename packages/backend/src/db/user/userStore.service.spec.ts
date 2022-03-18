import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { UserStoreService } from './userStore.service';
import { User } from './user.schema';
import { Model } from 'mongoose';

const mockUser = {
  house: null,
  firebaseId: 'blablabla',
};

describe('UserStoreService', () => {
  let userService: UserStoreService;
  let model: Model<User>;
  const usersArray = [
    {
      house: null,
      firebaseId: 'blablabla',
    },
    {
      house: null,
      firebaseId: 'www',
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
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            exec: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    userService = module.get<UserStoreService>(UserStoreService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await userService.findAll();
    expect(users).toEqual(usersArray);
  });

  it('should insert a new user', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        house: null,
        firebaseId: 'blablabla',
      }),
    );
    const newUser = await userService.create({
      house: null,
      firebaseId: 'blablabla',
    });
    expect(newUser).toEqual(mockUser);
  });
});
