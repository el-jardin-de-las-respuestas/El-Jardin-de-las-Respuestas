import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) { }
  async signIn(createAuthDto: CreateAuthDto) {
    const user = await this.findOneByEmail(createAuthDto.email)
    const isMatch = await bcrypt.compare(createAuthDto.password, user!.password);
      if (!isMatch) {
      throw new Error('Invalid credentials');
    }
  }

    async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email }});
  }

}
