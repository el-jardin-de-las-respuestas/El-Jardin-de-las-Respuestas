import { Injectable } from '@nestjs/common';
  import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LibraryService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.library.findMany();
  }

  async create(data: { title: string; description: string; icon?: string }) {
    return this.prisma.library.create({ data });
  }
}
