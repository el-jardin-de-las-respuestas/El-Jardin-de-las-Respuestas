import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateMessageDto {
  @IsInt()
  @IsNotEmpty()
  chatId: number;

  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
