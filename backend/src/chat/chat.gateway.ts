import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from 'src/chat/chat.service';
import { CreateMessageDto } from 'src/chat/dto/create-message.dto';
import { JoinChatDto } from 'src/chat/dto/join-chat.dto';
import { ValidationPipe } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*', credentials: true } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @MessageBody(new ValidationPipe()) dto: JoinChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { userId, professionalId } = dto;

    const participants = await this.chatService.validateParticipants(userId, professionalId);
    if (!participants) {
      client.emit('chatError', {
        type: 'ROLE_INVALID',
        message: 'Roles inválidos para iniciar el chat',
      });
      return;
    }

    const chat = await this.chatService.getOrCreateChat(userId, professionalId);
    client.data.userId = userId;
    client.join(`chat_${chat.id}`);

    const messages = await this.chatService.getChatHistory(chat.id);

    client.emit('joinedChat', { chatId: chat.id });
    client.emit('chatHistory', messages);
    this.server.to(`chat_${chat.id}`).except(client.id).emit('userJoined', { userId });
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody(new ValidationPipe()) dto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { chatId, userId } = dto;

    if (client.data.userId !== userId) {
      client.emit('chatError', {
        type: 'IDENTITY_MISMATCH',
        message: 'Identidad no coincide con el socket',
      });
      return;
    }

    const chatUser = await this.chatService.validateChatAccess(chatId, userId);
    if (!chatUser) {
      client.emit('chatError', {
        type: 'ACCESS_DENIED',
        message: 'No tienes acceso a este chat',
      });
      return;
    }

    const message = await this.chatService.createMessage(dto);
    const enrichedMessage = { ...message, status: 'sent', delivered: true };

    this.server.to(`chat_${chatId}`).emit('message', enrichedMessage);
    client.emit('messageSent', enrichedMessage);
  }
}

