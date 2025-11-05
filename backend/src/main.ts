import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // ----------------------------------------------------
  // DIAGNÓSTICO CRÍTICO:
  // Si esto imprime vacío o undefined, el problema es de Docker/Entrypoint.
  console.log('DIAGNÓSTICO: DATABASE_URL disponible en process.env:', process.env.DATABASE_URL);
  // ----------------------------------------------------

  const app = await NestFactory.create(AppModule);

  // Asegúrate de que el puerto esté bien configurado, usando process.env.PORT o 4000
  const port = process.env.PORT || 4000; 

  await app.listen(port);
  console.log(`La app está corriendo en: ${await app.getUrl()}`);
}
bootstrap();