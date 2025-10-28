import { IsInt, IsNotEmpty } from 'class-validator';

export class JoinChatDto {
  @IsInt()
  @IsNotEmpty()
  userId: number; // ID del usuario que inicia el chat

  @IsInt()
  @IsNotEmpty()
  professionalId: number; // ID del profesional con quien se quiere chatear
}
