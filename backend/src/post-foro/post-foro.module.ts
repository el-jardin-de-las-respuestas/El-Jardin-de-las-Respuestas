import { Module } from '@nestjs/common';
import { PostForoService } from './post-foro.service';
import { PostForoController } from './post-foro.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],       // permite usar PrismaService
  controllers: [PostForoController],
  providers: [PostForoService],
  exports: [PostForoService],
})
export class PostForoModule {}
