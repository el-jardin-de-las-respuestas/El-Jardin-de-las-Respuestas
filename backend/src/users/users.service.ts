import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class UsersService {
  private prisma = new PrismaClient();

  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    return this.prisma.users.findMany();
  }

  async findOneById(id: string) {
    return this.prisma.users.findUnique({where:{id}});
  }

  async findOneByEmail(email:string) {
    return this.prisma.users.findUnique({where:{email}});
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.prisma.users.update({where:{id}, data: updateUserDto})
    } catch(err:any) {
      throw new Error(`Could not update user: ${err.message}`)
    }
  }

  async removeById(id: string) {
      try {
      return await this.prisma.users.delete({where:{id}});
    } catch(err:any) {
      throw new Error(`Could not delete user: ${err.message}`)
    }
  }
  }
