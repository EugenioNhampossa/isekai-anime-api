import { PartialType } from '@nestjs/mapped-types';
import { CreateCharacterDto } from './create-character.dto';
import { IsOptional, IsString } from 'class-validator';

export class CharacterFiltedDTO extends PartialType(CreateCharacterDto) {
  @IsString()
  @IsOptional()
  page?: number;

  @IsString()
  @IsOptional()
  perPage?: number;
}
