import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true,
      exceptionFactory: (errors) => {
        const messages = errors.map(
          (err) =>
            `${err.property} - ${Object.values(err.constraints!).join(', ')}`
        );
        return new BadRequestException(messages);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
