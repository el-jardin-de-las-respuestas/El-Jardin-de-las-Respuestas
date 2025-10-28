import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProfessionalService {
  constructor(private prisma: PrismaService) {}

  async create(createProfessionalDto: CreateProfessionalDto) {
    try {
      return await this.prisma.professional.create({
        data: createProfessionalDto
      });
    } catch (error) {
      if (error?.code === 'P2002') {
        throw new BadRequestException(
          'Ya existe un profesional con esos datos',
        );
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.professional.findMany({
      include: { user: true },
    });
  }

  async findOne(id: number) {
    const professional = await this.prisma.professional.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!professional) {
      throw new NotFoundException(`Professional with ID ${id} not found`);
    }

    return professional;
  }

  async update(id: number, updateProfessionalDto: UpdateProfessionalDto) {
    const professional = await this.prisma.professional.findUnique({
      where: { id },
    });
    if (!professional) {
      throw new NotFoundException(`Professional with ID ${id} not found`);
    }

    return this.prisma.professional.update({
      where: { id },
      data: updateProfessionalDto,
      include: { user: true },
    });
  }

  async remove(id: number) {
    const professional = await this.prisma.professional.findUnique({
      where: { id },
    });
    if (!professional) {
      throw new NotFoundException(`Professional with ID ${id} not found`);
    }

    return this.prisma.professional.delete({
      where: { id },
    });
  }
}
