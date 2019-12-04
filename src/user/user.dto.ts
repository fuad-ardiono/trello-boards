import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  displayName: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  imageUrl: string;
}

// tslint:disable-next-line:max-classes-per-file
export class SigninUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  displayName: string;
}
