import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { APIController } from './api.controller';

describe('V1 ApiController', () => {
  let apiController: APIController;

  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date(2022, 7, 23));
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [APIController],
    }).compile();

    apiController = app.get<APIController>(APIController);
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('root', () => {
    it('should return time', () => {
      const result = apiController.getPing();
      expect(result.time).toEqual(new Date(2022, 7, 23));
    });
  });
});
