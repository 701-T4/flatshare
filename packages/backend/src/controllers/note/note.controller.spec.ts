/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { House } from '../../db/house/house.schema';
import { User } from '../../db/user/user.schema';
import { Note } from '../../db/note/note.schema';
import { HouseStoreService } from '../../db/house/houseStore.service';
import { NoteStoreService } from '../../db/note/noteStore.service';
import { UserStoreService } from '../../db/user/userStore.service';
import { NoteController } from './note.controller';
import { getModelToken } from '@nestjs/mongoose';
import { NoteUtil } from './note.utils';
import { mockModel } from '../../util/testing.utils';

describe('HouseController', () => {
  let controller: NoteController;
  let userStoreService: UserStoreService;
  let houseStoreService: HouseStoreService;
  let noteStoreService: NoteStoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteController],
      providers: [
        NoteStoreService,
        HouseStoreService,
        UserStoreService,
        {
          provide: getModelToken(User.name),
          useValue: mockModel,
        },
        {
          provide: getModelToken(House.name),
          useValue: mockModel,
        },
        {
          provide: getModelToken(Note.name),
          useValue: mockModel,
        },
        NoteUtil,
      ],
    }).compile();

    userStoreService = module.get<UserStoreService>(UserStoreService);
    houseStoreService = module.get<HouseStoreService>(HouseStoreService);
    noteStoreService = module.get<NoteStoreService>(NoteStoreService);
    controller = module.get<NoteController>(NoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
