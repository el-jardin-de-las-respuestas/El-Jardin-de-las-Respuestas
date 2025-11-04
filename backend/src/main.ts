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

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`Backend escuchando en http://localhost:${port}`);
}
bootstrap();
