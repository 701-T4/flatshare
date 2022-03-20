import { Test, TestingModule } from '@nestjs/testing';
import { TaskStoreService } from '../../db/task/taskStore.service';
import { HouseStoreService } from '../../db/house/houseStore.service';
import { UserStoreService } from '../../db/user/userStore.service';
import { UsersController } from './users.controller';
import { TaskUtil } from '../tasks/tasks.util';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: HouseStoreService, useValue: {} },
        { provide: UserStoreService, useValue: {} },
        { provide: TaskStoreService, useValue: {} },
        TaskUtil,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
