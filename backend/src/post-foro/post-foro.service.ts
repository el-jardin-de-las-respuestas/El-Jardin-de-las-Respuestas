import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // servicio que conecta con la DB
import { PostForo } from '@prisma/client';

@Injectable()
export class PostForoService {
  constructor(private prisma: PrismaService) {}

  findAll(): Promise<PostForo[]> {
    return this.prisma.postForo.findMany(); // trae todos los posts
  }

  create(data: { titulo: string; contenido: string; id_autor: number; es_anonimo: boolean }): Promise<PostForo> {
    return this.prisma.postForo.create({ data }); // crea un post nuevo
  }
}
