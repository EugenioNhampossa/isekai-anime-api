import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStudioDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
