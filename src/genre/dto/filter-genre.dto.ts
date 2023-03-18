import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateGenreDto } from './create-genre.dto';

export class FilterGenreDto extends PartialType(CreateGenreDto) {
  @IsString()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  perPage?: number;
}
