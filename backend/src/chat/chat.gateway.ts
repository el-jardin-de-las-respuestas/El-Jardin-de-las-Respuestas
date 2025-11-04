import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface JoinChatDto {
  userId: number;
  professionalId: number;
}

interface SendMessageDto {
  chatId: string;
  userId: number;
  content: string;
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private chatRooms = new Map<string, number>();

  handleConnection(client: Socket) {
    console.log('🟢 Cliente conectado:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('🔴 Cliente desconectado:', client.id);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(
    @MessageBody() data: JoinChatDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { userId, professionalId } = data;
    if (!userId || !professionalId) {
      client.emit('error', 'userId y professionalId requeridos');
      return;
    }

    const chatRoom = `chat_${userId}_${professionalId}`;
    client.join(chatRoom);
    console.log(`📥 Cliente ${client.id} se unió a ${chatRoom}`);
    client.emit('joinedChat', { chatRoom });
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody() data: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const { chatId, userId, content } = data;
    if (!chatId || !content) return;

    const message = {
      id: Date.now(),
      chatId,
      userId,
      content,
      sentAt: new Date().toISOString(),
    };

    console.log(`✉️ Mensaje en ${chatId}: ${content}`);
    this.server.to(chatId).emit('message', message);
    this.server.emit('newChat', {
      chatId,
      userId,
      lastMessage: content,
      sentAt: message.sentAt,
    });
  }
}
