import { Controller, Get, Post, Body } from '@nestjs/common';
import { PostForoService } from './post-foro.service';

@Controller('post-foro')
export class PostForoController {
  constructor(private readonly postForoService: PostForoService) {}

  @Get()
  findAll() {
    return this.postForoService.findAll(); // ruta GET /post-foro
  }

  @Post()
  create(@Body() body: { titulo: string; contenido: string; id_autor: number; es_anonimo: boolean }) {
    return this.postForoService.create(body); // ruta POST /post-foro
  }
}
