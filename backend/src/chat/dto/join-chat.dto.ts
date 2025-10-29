import { IsInt, IsNotEmpty } from 'class-validator';

export class JoinChatDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsNotEmpty()
  professionalId: number;
}
