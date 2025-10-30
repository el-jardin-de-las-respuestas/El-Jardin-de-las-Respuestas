import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreateChat(userId: number, professionalId: number) {
    let chat = await this.prisma.chat.findFirst({
      where: {
        userId,
        professionalId,
      },
      include: {
        messages: {
          include: { user: true },
        },
      },
    });

    if (!chat) {
      chat = await this.prisma.chat.create({
        data: {
          userId,
          professionalId,
        },
        include: {
          messages: {
            include: { user: true },
          },
        },
      });
    }

    return chat;
  }

  async getChatMessages(chatId: number) {
    return this.prisma.message.findMany({
      where: { chatId },
      include: { user: true },
      orderBy: { sentAt: 'asc' },
    });
  }

  async createMessage(chatId: number, userId: number, content: string) {
    return this.prisma.message.create({
      data: {
        chatId,
        userId,
        content,
      },
      include: {
        user: true,
      },
    });
  }
}
