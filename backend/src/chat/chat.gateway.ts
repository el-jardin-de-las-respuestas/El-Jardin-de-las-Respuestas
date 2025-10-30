import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];
      if (!token) throw new UnauthorizedException('Token no proporcionado');

      const payload = this.jwtService.verify(token);
      client.data.userId = payload.sub; // extrae el ID del usuario del token
      this.logger.log(`Usuario ${client.data.userId} conectado`);
    } catch (error) {
      this.logger.error('❌ Error de autenticación:', error.message);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Usuario ${client.data.userId} desconectado`);
  }

  @SubscribeMessage('joinChat')
  async handleJoinChat(
    @MessageBody() { professionalId }: { professionalId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;

    const chat = await this.chatService.findOrCreateChat(userId, professionalId);
    client.join(`chat-${chat.id}`);

    const messages = await this.chatService.getChatMessages(chat.id);
    client.emit('joinedChat', { chatId: chat.id });
    client.emit('chatHistory', messages);

    this.logger.log(`Usuario ${userId} se unió al chat ${chat.id}`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() { chatId, content }: { chatId: number; content: string },
    @ConnectedSocket() client: Socket,
  ) {
    const userId = client.data.userId;
    const message = await this.chatService.createMessage(chatId, userId, content);

    this.server.to(`chat-${chatId}`).emit('message', message);
    this.logger.log(`💬 Mensaje en chat ${chatId} por usuario ${userId}`);
  }
}
