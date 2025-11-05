import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'El jardin de las respuestas API :)';
  }
}
