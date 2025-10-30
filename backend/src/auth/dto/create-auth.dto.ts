import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength
} from 'class-validator';



export class CreateAuthDto {
    @IsNotEmpty({ message: 'Email is mandatory' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Password is mandatory' })
    @MinLength(6)
    @IsString({ message: 'Password must be of type string' })
    password: string;

    @IsNotEmpty({ message: 'Role is mandatory' })
    roleId: number;
}
