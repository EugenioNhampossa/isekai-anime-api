import { Test, TestingModule } from '@nestjs/testing';
import { StudioController } from './studio.controller';
import { StudioService } from './studio.service';

describe('StudioController', () => {
  let controller: StudioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudioController],
      providers: [StudioService],
    }).compile();

    controller = module.get<StudioController>(StudioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
