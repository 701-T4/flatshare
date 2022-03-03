import { Test, TestingModule } from '@nestjs/testing';
import { SampleController } from './db.controller';
import { CreateSampleDto } from './dto/create-sample.dto';
import { SampleService } from './db.service';

describe('Samples Controller', () => {
  let controller: SampleController;
  let service: SampleService;
  const CreateSampleDto: CreateSampleDto = {
    name: 'Sample #1',
    breed: 'Breed #1',
    age: 4,
  };

  const mockSample = {
    name: 'Sample #1',
    breed: 'Breed #1',
    age: 4,
    _id: 'a id',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SampleController],
      providers: [
        {
          provide: SampleService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              {
                name: 'Sample #1',
                breed: 'Bread #1',
                age: 4,
              },
              {
                name: 'Sample #2',
                breed: 'Breed #2',
                age: 3,
              },
              {
                name: 'Sample #3',
                breed: 'Breed #3',
                age: 2,
              },
            ]),
            create: jest.fn().mockResolvedValue(CreateSampleDto),
          },
        },
      ],
    }).compile();

    controller = module.get<SampleController>(SampleController);
    service = module.get<SampleService>(SampleService);
  });

  describe('create()', () => {
    it('should create a new Sample', async () => {
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(mockSample);

      await controller.create(CreateSampleDto);
      expect(createSpy).toHaveBeenCalledWith(CreateSampleDto);
    });
  });

  describe('findAll()', () => {
    it('should return an array of Samples', async () => {
      expect(controller.findAll()).resolves.toEqual([
        {
          name: 'Sample #1',
          breed: 'Bread #1',
          age: 4,
        },
        {
          name: 'Sample #2',
          breed: 'Breed #2',
          age: 3,
        },
        {
          name: 'Sample #3',
          breed: 'Breed #3',
          age: 2,
        },
      ]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
