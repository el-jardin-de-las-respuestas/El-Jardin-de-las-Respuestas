import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SafeUser } from 'src/types/user.types';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // Use of select to avoid exposing the hashed password to the frontend
  private readonly safeUserSelect = {
    id: true,
    email: true,
    birthdate: true,
    registeredAt: true,
    username: true,
    role: true,
  };

  private readonly saltRounds = 10;

  async create(createUserDto: CreateUserDto): Promise<SafeUser> {
    const existingEmail = await this.findOneByEmail(createUserDto.email);
    if (existingEmail) {
      throw new BadRequestException('Email already registered');
    }
    const existingUsername = await this.findOneByUsername(
      createUserDto.username,
    );
    if (existingUsername) {
      throw new BadRequestException('Username already registered');
    }
    const hash = await this.hashPassword(createUserDto.password);
    const newUser = await this.prisma.user.create({
      data: {
        username: createUserDto.username,
        email: createUserDto.email,
        birthdate: new Date(createUserDto.birthdate),
        password: hash,
        role: {
          create: { name: 'default' },
        },
      },
      select: this.safeUserSelect, 
    });

    return newUser;
  }

  async findAll() {
    return this.prisma.user.findMany({ select: this.safeUserSelect });
  }

  async findOneById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: this.safeUserSelect,
    });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: this.safeUserSelect,
    });
  }

  async findOneByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
      select: this.safeUserSelect,
    });
  }

  async updateById(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<SafeUser> {
    try {
      if (updateUserDto.password) {
        const saltRounds: number = 10;
        updateUserDto.password = await this.hashPassword(
          updateUserDto.password,
        );
      }
      return await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
        select: this.safeUserSelect,
      });
    } catch (err) {
      throw new Error(`Could not update user: ${err.message}`);
    }
  }

  async activateUser(id: number): Promise<SafeUser> {
    return await this.updateById(id, { isActive: true });
  }

  async deactivateUser(id: number): Promise<SafeUser> {
    return await this.updateById(id, { isActive: false });
  }

  async removeById(id: number): Promise<SafeUser> {
    try {
      return await this.prisma.user.delete({
        where: { id },
        select: this.safeUserSelect,
      });
    } catch (err: any) {
      throw new Error(`Could not delete user: ${err.message}`);
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
}
