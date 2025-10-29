import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface Message {
  chatId: number;
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

  handleConnection(client: Socket) {
    console.log('🟢 Cliente conectado:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('🔴 Cliente desconectado:', client.id);
  }

  @SubscribeMessage('joinChat')
  handleJoinChat(
    @MessageBody() data: { userId: number; professionalId: number },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('📥 joinChat recibido:', data);
    // En un futuro, buscás el chatId en BD. Por ahora simula un chatId.
    const chatId = 1;
    client.join(`chat_${chatId}`);
    client.emit('joinedChat', { chatId });
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(
    @MessageBody() message: Message,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('✉️ Mensaje recibido:', message);

    // reenviar a todos en la sala
    this.server.to(`chat_${message.chatId}`).emit('message', {
      id: Date.now(),
      content: message.content,
      sentAt: new Date().toISOString(),
      user: {
        id: message.userId,
        username: `Usuario ${message.userId}`,
      },
    });
  }
}
