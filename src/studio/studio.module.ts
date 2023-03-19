import { Module } from '@nestjs/common';
import { StudioService } from './studio.service';
import { StudioController } from './studio.controller';

@Module({
  controllers: [StudioController],
  providers: [StudioService]
})
export class StudioModule {}
