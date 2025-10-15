import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {
    IsOptional, IsBoolean, IsString,
    IsNotEmpty,
    MinLength, IsEmail, MaxLength
} from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsBoolean({ message: 'isActive must be a boolean' })
    isActive?: boolean;

    @IsOptional()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @IsString({ message: 'Password must be of type string' })
    @MaxLength(100, {
        message: 'Password must not exceed 100 characters.',
      })
    password?: string;

    @IsOptional()
    @IsEmail()
    
    email?: string;


}
