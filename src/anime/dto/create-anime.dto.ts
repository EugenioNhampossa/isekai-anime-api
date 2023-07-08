import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAnimeDto {
  @IsString()
  @IsNotEmpty()
  id_author: string;

  @IsNotEmpty()
  @IsString()
  id_studio: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  synopsis: string;

  @IsString()
  image: string;

  @IsInt()
  @IsNotEmpty()
  episodes: number;

  @IsInt()
  @IsNotEmpty()
  seasons: number;

  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @IsDateString()
  @IsOptional()
  endDate?: Date;
}
