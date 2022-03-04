import { Test, TestingModule } from '@nestjs/testing';
import { SampleService } from './sample.service';
import { getModelToken } from '@nestjs/mongoose';
import { Sample } from './sample.schema';
import { Model } from 'mongoose';

const mockSample = {
  name: 'Sample #1',
  breed: 'Breed #1',
  age: 4,
};

describe('SampleService', () => {
  let service: SampleService;
  let model: Model<Sample>;

  const samplesArray = [
    {
      name: 'Sample #1',
      breed: 'Breed #1',
      age: 4,
    },
    {
      name: 'Sample #2',
      breed: 'Breed #2',
      age: 2,
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SampleService,
        {
          provide: getModelToken('Sample'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockSample),
            constructor: jest.fn().mockResolvedValue(mockSample),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SampleService>(SampleService);
    model = module.get<Model<Sample>>(getModelToken('Sample'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all samples', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(samplesArray),
    } as any);
    const samples = await service.findAll();
    expect(samples).toEqual(samplesArray);
  });

  it('should insert a new sample', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        name: 'Sample #1',
        breed: 'Breed #1',
        age: 4,
      }),
    );
    const newSample = await service.create({
      name: 'Sample #1',
      breed: 'Breed #1',
      age: 4,
    });
    expect(newSample).toEqual(mockSample);
  });
});
