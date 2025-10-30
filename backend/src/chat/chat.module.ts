import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ChatGateway, ChatService, PrismaService],
  exports: [ChatService],
})
export class ChatModule {}
