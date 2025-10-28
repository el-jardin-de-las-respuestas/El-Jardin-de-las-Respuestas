import { IsString, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateProfessionalDto {


  @IsString()
  @IsNotEmpty({ message: 'La especialidad es obligatoria' })
  @Length(3, 100, { message: 'La especialidad debe tener entre 3 y 100 caracteres' })
  specialty: string;

  @IsString ()
  @IsNotEmpty({ message: 'El número de matrícula es obligatorio' })
  @Length(3, 20, { message: 'La matrícula debe tener entre 3 y 20 caracteres' })
  registrationNumber: string;

  @IsString()
  @IsOptional()
  @Length(0, 500, { message: 'La bio no puede superar los 500 caracteres' })
  bio?: string;
}