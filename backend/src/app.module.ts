import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostForoModule } from './post-foro/post-foro.module';
import { LibraryModule } from './library/library.module';
import { ProfessionalModule } from './professional/professional.module';
import { ChatModule } from './chat/chat.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ChatModule,
    PostForoModule,
    LibraryModule,
    ProfessionalModule,

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
