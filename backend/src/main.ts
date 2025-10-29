import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4000);
  console.log(`🚀 Backend escuchando en http://localhost:${process.env.PORT ?? 4000}`);
}
bootstrap();