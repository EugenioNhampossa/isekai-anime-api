import { Test, TestingModule } from '@nestjs/testing';
import { StudioService } from './studio.service';

describe('StudioService', () => {
  let service: StudioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudioService],
    }).compile();

    service = module.get<StudioService>(StudioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
