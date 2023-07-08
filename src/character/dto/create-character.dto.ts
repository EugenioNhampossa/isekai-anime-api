import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateCharacterDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id_anime: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsOptional()
  main: boolean;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  image: string;
}
