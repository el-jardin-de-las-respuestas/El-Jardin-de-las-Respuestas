import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from 'src/chat/dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  // ✅ Valida que el usuario sea USER y el profesional sea PROFESSIONAL
async validateParticipants(userId: number, professionalId: number) {
  const user = await this.prisma.user.findUnique({
    where: { id: userId },
    include: { professional: true },
  });

  const professional = await this.prisma.user.findUnique({
    where: { id: professionalId },
    include: { professional: true },
  });

  if (
    !user || user.roleId !== 3 ||
    !professional || professional.roleId !== 6 ||
    !professional.professional
  ) {
    return null;
  }

  return { user, professional };
}

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

  async getChatHistory(chatId: number) {
    return this.prisma.message.findMany({
      where: { chatId },
      orderBy: { sentAt: 'asc' },
      include: { user: true },
    });
  }

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

  async createMessage(dto: CreateMessageDto) {
    return this.prisma.message.create({
      data: {
        content: dto.content,
        userId: dto.userId,
        chatId: dto.chatId,
      },
      include: { user: true },
    });
  }
}
