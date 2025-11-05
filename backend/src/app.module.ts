import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostForoModule } from './post-foro/post-foro.module';
import { LibraryModule } from './library/library.module';
import { ProfessionalModule } from './professional/professional.module';
import { ChatModule } from './chat/chat.module';
import { ForumModule } from './forum/forum.module';
import { ConfigModule } from '@nestjs/config'; // 👈 Importamos ConfigModule

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    AuthModule,
    PrismaModule,
    ChatModule,
    PostForoModule, 
    LibraryModule, 
    ProfessionalModule, 
    ForumModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}