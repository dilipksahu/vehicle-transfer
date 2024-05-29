import { IsString } from 'class-validator';

export class CreateDriverDto {
  @IsString()
  name: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  profilePhoto: string;
}
