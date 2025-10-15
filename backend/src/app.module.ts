import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { Prisma } from 'generated/prisma';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
