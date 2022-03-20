/* eslint-disable @typescript-eslint/no-explicit-any */

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { TaskStoreService } from './taskStore.service';
import { Task } from './task.schema';
import { Model } from 'mongoose';

const currentDate = new Date();
const mockTask = {
  name: 'Task 1',
  description: 'Clean the floor',
  lastCompleted: null,
  dueDate: currentDate,
  interval: 0,
  assigned: 'Bob',
  pool: ['Bob'],
  house: null,
};

describe('TaskStoreService', () => {
  let taskService: TaskStoreService;
  let model: Model<Task>;
  const tasksArray = [
    {
      name: 'Task 1',
      description: 'Clean the floor',
      lastCompleted: null,
      dueDate: currentDate,
      interval: 0,
      assigned: 'Bob',
      pool: ['Bob'],
      house: null,
    },
    {
      name: 'Task 2',
      description: 'Clean the kitchen',
      lastCompleted: null,
      dueDate: currentDate,
      interval: 0,
      assigned: 'Bob',
      pool: ['Bob'],
      house: null,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskStoreService,
        {
          provide: getModelToken('Task'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockTask),
            constructor: jest.fn().mockResolvedValue(mockTask),
            find: jest.fn(),
            findOne: jest.fn(),
            findOneAndUpdate: jest.fn(),
            exec: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    taskService = module.get<TaskStoreService>(TaskStoreService);
    model = module.get<Model<Task>>(getModelToken('Task'));
  });

  it('should be defined', () => {
    expect(taskService).toBeDefined();
  });

  it('should return all tasks', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(tasksArray),
    } as any);
    const tasks = await taskService.findAll();
    expect(tasks).toEqual(tasksArray);
  });

  it('should insert a new task', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Task 1',
        description: 'Clean the floor',
        lastCompleted: null,
        dueDate: currentDate,
        interval: 0,
        assigned: 'Bob',
        pool: ['Bob'],
        house: null,
      }),
    );
    const newTask = await taskService.create({
      name: 'Task 1',
      description: 'Clean the floor',
      lastCompleted: null,
      dueDate: currentDate,
      interval: 0,
      assigned: 'Bob',
      pool: ['Bob'],
      house: null,
    });
    expect(newTask).toEqual(mockTask);
  });
});
