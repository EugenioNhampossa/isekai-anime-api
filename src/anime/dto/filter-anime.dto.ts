import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateAnimeDto } from './create-anime.dto';

export class AnimeFilterDto extends PartialType(CreateAnimeDto) {
  @IsString()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  perPage?: number;
}
