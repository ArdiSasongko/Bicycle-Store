import { Test, TestingModule } from '@nestjs/testing';
import { BicycleController } from './bicycle.controller';

describe('BicycleController', () => {
  let controller: BicycleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BicycleController],
    }).compile();

    controller = module.get<BicycleController>(BicycleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
