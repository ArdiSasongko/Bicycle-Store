import { Test, TestingModule } from '@nestjs/testing';
import { BicycleService } from './bicycle.service';

describe('BicycleService', () => {
  let service: BicycleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BicycleService],
    }).compile();

    service = module.get<BicycleService>(BicycleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
