import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class ForumService {
  constructor(private prisma: PrismaService) { }

  async getAllPosts() {
    return this.prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        forum: true,
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        publishedAt: 'desc',
      },
    });
  }

  async createPost(userId: number, createPostDto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        forum: true,
      },
    });
  }

  async toggleLike(postId: number, userId: number) {
    const existingLike = await this.prisma.postLike.findUnique({
      where: {
        postId_userId: {
          postId,
          userId,
        },
      },
    });

    if (existingLike) {
      await this.prisma.postLike.delete({
        where: {
          id: existingLike.id,
        },
      });
      return { liked: false };
    } else {
      await this.prisma.postLike.create({
        data: {
          postId,
          userId,
        },
      });
      return { liked: true };
    }
  }

  async getComments(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        commentedAt: 'asc',
      },
    });
  }

  async createComment(postId: number, userId: number, createCommentDto: CreateCommentDto) {
    return this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        postId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  async getAllForums() {
    return this.prisma.forum.findMany({
      include: {
        _count: {
          select: {
            posts: true,
          },
        },
      },
    });
  }

  // 🆕 AGREGAR ESTE MÉTODO NUEVO
  async createForum(userId: number, data: { title: string; description: string }) {
    const exists = await this.prisma.forum.findFirst({
      where: {
        title: {
          equals: data.title,
          mode: 'insensitive',
        },
      },
    });

    if (exists) {
      throw new Error('Esta categoría ya existe');
    }

    return this.prisma.forum.create({
      data: {
        title: data.title,
        description: data.description,
        userId: userId,
      },
    });
  }
}