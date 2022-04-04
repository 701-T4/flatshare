/* eslint-disable @typescript-eslint/no-explicit-any */
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { IssueStoreService } from './issueStore.service';
import { Issue } from './issue.schema';
import { Model } from 'mongoose';

const CURRENT_DATE = new Date();

const mockIssue = {
  name: 'My Toilet Broke!',
  description: 'I tried to flush and now everything is on fire.',
  image: '',
  house: null,
  logger: null,
  loggedDate: CURRENT_DATE,
  resolved: false,
};

describe('IssueStoreService', () => {
  let service: IssueStoreService;
  let model: Model<Issue>;

  const IssuesArray = [
    {
      name: 'My Toilet Broke!',
      description: 'I tried to flush and now everything is on fire.',
      image: '',
      house: null,
      logger: null,
      loggedDate: new Date(),
      resolved: false,
    },
    {
      name: 'The Fan Broke!',
      description: 'I tried to cool down and now everything is on fire.',
      image: '',
      house: null,
      logger: null,
      loggedDate: new Date(),
      resolved: false,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IssueStoreService,
        {
          provide: getModelToken('Issue'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockIssue),
            constructor: jest.fn().mockResolvedValue(mockIssue),
            find: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IssueStoreService>(IssueStoreService);
    model = module.get<Model<Issue>>(getModelToken('Issue'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all Issues', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(IssuesArray),
    } as any);
    const issues = await service.findAll();
    expect(issues).toEqual(IssuesArray);
  });

  it('should return one Issue', async () => {
    jest.spyOn(model, 'findOne').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(mockIssue),
    } as any);
    const issue = await service.findOne('_id');
    expect(issue).toEqual(mockIssue);
  });

  it('should insert a new Issue', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'My Toilet Broke!',
        description: 'I tried to flush and now everything is on fire.',
        image: '',
        house: null,
        logger: null,
        loggedDate: CURRENT_DATE,
        resolved: false,
      }),
    );
    const newIssue = await service.create({
      name: 'My Toilet Broke!',
      description: 'I tried to flush and now everything is on fire.',
      image: '',
      house: null,
      logger: null,
      loggedDate: CURRENT_DATE,
      resolved: false,
    });
    expect(newIssue).toEqual(mockIssue);
  });
});
