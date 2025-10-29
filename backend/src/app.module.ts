import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Prisma } from 'generated/prisma';
import { PrismaModule } from './prisma/prisma.module';
import { PostForoModule } from './post-foro/post-foro.module';
import { LibraryModule } from './library/library.module';
import { ProfessionalModule } from './professional/professional.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [AuthModule,PrismaModule,ChatModule,PostForoModule, LibraryModule, ProfessionalModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


