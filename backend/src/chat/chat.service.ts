import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  //Verifica que los participantes existan y tengan los roles correctos
  async validateParticipants(userId: number, professionalId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { role: true },
    });

    const professional = await this.prisma.user.findUnique({
      where: { id: professionalId },
      include: { role: true, professional: true },
    });

    if (
      !user ||
      !professional ||
      !professional.professional ||
      user.role.name !== 'USER' ||
      professional.role.name !== 'PROFESSIONAL'
    ) {
      return null;
    }

    return { user, professional };
  }

  //Crea o recupera un chat entre un usuario y un profesional
  async getOrCreateChat(userId: number, professionalId: number) {
    let chat = await this.prisma.chat.findFirst({
      where: {
        AND: [
          { chatUsers: { some: { userId } } },
          { chatUsers: { some: { userId: professionalId } } },
        ],
      },
      include: { chatUsers: true },
    });

    if (!chat) {
      chat = await this.prisma.chat.create({
        data: {
          chatUsers: {
            create: [{ userId }, { userId: professionalId }],
          },
        },
        include: { chatUsers: true },
      });
    }

    return chat;
  }

  //Trae el historial de mensajes de un chat
  async getChatHistory(chatId: number) {
    return this.prisma.message.findMany({
      where: { chatId },
      orderBy: { sentAt: 'asc' },
      include: { user: { select: { username: true } } },
    });
  }

  //Valida que un usuario pertenezca al chat
  async validateChatAccess(chatId: number, userId: number) {
    return this.prisma.chatUser.findUnique({
      where: {
        chatId_userId: {
          chatId,
          userId,
        },
      },
    });
  }

  //Crea un mensaje y lo guarda en DB
  async createMessage(dto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        content: dto.content,
        userId: dto.userId,
        chatId: dto.chatId,
      },
      include: { user: { select: { username: true } } },
    });
  }
}
