import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;
}
