import { Controller, Get, Post, Param, Delete, Body } from '@nestjs/common';
import { PostForoService } from './post-foro.service';

@Controller('post-foro')
export class PostForoController {
  constructor(private readonly postForoService: PostForoService) {}

  // Obtener todos los posts
  @Get()
  findAll() {
    return this.postForoService.findAll();
  }

  // Crear un nuevo post
  @Post()
  create(
    @Body()
    body: { title: string; content: string; userId: number; forumId: number; isAnonymous?: boolean },
  ) {
    return this.postForoService.create(body);
  }

  // Obtener un post por ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postForoService.findOne(Number(id));
  }

  // Obtener todos los posts de un foro específico
  @Get('forum/:forumId')
  findAllByForum(@Param('forumId') forumId: string) {
    return this.postForoService.findAllByForum(Number(forumId));
  }

  // Eliminar un post por ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postForoService.remove(Number(id));
  }
}
