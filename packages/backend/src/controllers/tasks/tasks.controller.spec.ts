import { Test, TestingModule } from '@nestjs/testing';
import { TaskStoreService } from '../../db/task/taskStore.service';
import { HouseStoreService } from '../../db/house/houseStore.service';
import { UserStoreService } from '../../db/user/userStore.service';
import { TasksController } from './tasks.controller';
import { TaskUtil } from './tasks.util';

describe('UsersController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        { provide: HouseStoreService, useValue: {} },
        { provide: UserStoreService, useValue: {} },
        { provide: TaskStoreService, useValue: {} },
        TaskUtil,
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
