import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LibraryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.library.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data: { title: string; description: string; content: string; icon?: string }) {
    return this.prisma.library.create({ data });
  }

  async findOne(id: number) {
    return this.prisma.library.findUnique({ where: { id } });
  }
}
