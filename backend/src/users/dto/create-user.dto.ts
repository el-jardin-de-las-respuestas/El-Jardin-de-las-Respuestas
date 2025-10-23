import {
  IsString,
  IsNotEmpty,
  IsDate,
  IsEmail,
  MinLength,
  MaxLength,
  IsOptional,
  IsNumber
} from 'class-validator';

import { Type } from 'class-transformer';


export class CreateUserDto {
  @IsNotEmpty()
  @IsString({ message: 'Name must be of type string' })
  username: string;

  @IsNotEmpty({ message: 'Email is mandatory' })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Birthdate is mandatory' })
  @Type(() => Date)
  birthdate: Date;

  @IsNotEmpty({ message: 'Password is mandatory' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsString({ message: 'Password must be of type string' })
  @MaxLength(100, {
    message: 'Password must not exceed 100 characters.',
  })

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsNumber()
  id_role?: number;

}