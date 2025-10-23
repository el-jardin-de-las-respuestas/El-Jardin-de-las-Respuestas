import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostForoService {
  constructor(private prisma: PrismaService) {}

  // Obtener todos los posts con el foro y el usuario
  async findAll() {
    return this.prisma.post.findMany({
      include: {
        forum: true,
        user: { select: { username: true } },
      },
      orderBy: { publishedAt: 'desc' },
    });
  }

  // Crear un nuevo post
  async create(data: { title: string; content: string; userId: number; forumId: number; isAnonymous?: boolean }) {
    const { title, content, userId, forumId, isAnonymous = false } = data;

    const [user, forum] = await Promise.all([
      this.prisma.user.findUnique({ where: { id: userId } }),
      this.prisma.forum.findUnique({ where: { id: forumId } }),
    ]);

    if (!user) throw new Error('User not found');
    if (!forum) throw new Error('Forum not found');

    return this.prisma.post.create({
      data: {
        title,
        content,
        userId,
        forumId,
        isAnonymous,
      },
    });
  }

  // Obtener un post por ID (con foro, autor y comentarios)
  async findOne(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        forum: true,
        user: { select: { username: true } },
        comments: true,
      },
    });
  }

  // Obtener todos los posts de un foro específico
  async findAllByForum(forumId: number) {
    return this.prisma.post.findMany({
      where: { forumId },
      include: {
        user: { select: { username: true } },
        comments: true,
      },
      orderBy: { publishedAt: 'desc' },
    });
  }

  //  Eliminar un post
  async remove(id: number) {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
