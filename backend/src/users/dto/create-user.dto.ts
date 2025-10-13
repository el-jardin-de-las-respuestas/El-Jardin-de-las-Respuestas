import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEmail,
  MinLength
} from 'class-validator';

import { Type } from 'class-transformer';


export class CreateUserDto {
  @IsNotEmpty({ message: 'Email is mandatory' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Birthdate is mandatory' })
  @Type(() => Date)
  @IsDate({ message: 'Birthdate must be of type Date' })
  birthdate: Date;

  @IsNotEmpty({ message: 'Password is mandatory' })
  @MinLength(6, {message: 'Password must be at least 6 characters long'})
  @IsString({ message: 'Password must be of type string' })
  password: string;

}