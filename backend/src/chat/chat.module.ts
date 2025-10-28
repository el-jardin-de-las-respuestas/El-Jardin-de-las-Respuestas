import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from 'src/chat/chat.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ChatGateway, ChatService],
  exports: [ChatService],
})
export class ChatModule {}

