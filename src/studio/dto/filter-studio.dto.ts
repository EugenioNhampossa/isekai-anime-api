import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateStudioDto } from './create-studio.dto';

export class FilterStudioDto extends PartialType(CreateStudioDto) {
  @IsString()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  perPage?: number;
}
