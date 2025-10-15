import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { SafeUser } from 'src/types/user.types';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) { }

  // Use of select to avoid exposing the hashed password to the frontend
  private readonly safeUserSelect = {
    id: true,
    email: true,
    birthdate: true,
    isActive: true,
    createdAt: true,
    updatedAt: true,
    name:true,
    role: true
  };
  
  private readonly saltRounds = 10

  async create(createUserDto: CreateUserDto): Promise<SafeUser> {
    const hash = await this.hashPassword(createUserDto.password)
    const newUser = await this.prisma.user.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        birthdate: createUserDto.birthdate,
        password: hash,
        isActive: true
      },
      select: this.safeUserSelect
    })

    return newUser;
  }

  async findAll() {
    return this.prisma.user.findMany({select: this.safeUserSelect});
  }

  async findOneById(id: string) {
    return this.prisma.user.findUnique({ where: { id }, select: this.safeUserSelect });
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email }, select: this.safeUserSelect });
  }

  async updateById(id: string, updateUserDto: UpdateUserDto) : Promise <SafeUser> {
    try {
      if (updateUserDto.password) {
        const saltRounds: number = 10
        updateUserDto.password = await this.hashPassword(updateUserDto.password)
      }
      return await this.prisma.user.update({
        where: { id }, data: updateUserDto, select: this.safeUserSelect
      })
    } catch (err: any) {
      throw new Error(`Could not update user: ${err.message}`)
    }
  }

  async activateUser(id: string): Promise<SafeUser> {
    return await this.updateById(id, { isActive: true });
  }

  async deactivateUser(id: string): Promise<SafeUser> {
    return await this.updateById(id, { isActive: false });
  }


  async removeById(id: string): Promise<SafeUser> {
    try {
      return await this.prisma.user.delete({ where: { id }, select: this.safeUserSelect});
    } catch (err: any) {
      throw new Error(`Could not delete user: ${err.message}`)
    }
  }
  
  private async hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, this.saltRounds);
}
}
