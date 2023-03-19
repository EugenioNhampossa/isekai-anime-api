import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';
import { CreateAuthorDto } from '.';

export class AuthorFilterDto extends PartialType(CreateAuthorDto) {
  @IsString()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  perPage?: number;
}
