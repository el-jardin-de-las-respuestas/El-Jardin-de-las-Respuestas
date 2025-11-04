import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    'http://localhost:3000',
    'https://el-jardin-de-las-respuestas.netlify.app',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('CORS no permitido'));
      }
    },
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}
bootstrap();
