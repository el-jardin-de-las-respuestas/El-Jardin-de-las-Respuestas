import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Public } from 'src/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';

@Controller('professional')
export class ProfessionalController {
  constructor(private readonly professionalService: ProfessionalService) {}

  @Public()
  @Post('register')
  create(
    @Body() body: { user: CreateUserDto; professional: CreateProfessionalDto },
  ) {
    const { user, professional } = body;
    return this.professionalService.create(user, professional);
  }
  @UseGuards()
  @Roles('admin')
  @Get()
  findAll() {
    return this.professionalService.findAll();
  }
  @UseGuards()
  @Roles('admin')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.professionalService.findOne(+id);
  }
  @UseGuards()
  @Roles('admin')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProfessionalDto: UpdateProfessionalDto,
  ) {
    return this.professionalService.update(+id, updateProfessionalDto);
  }
  @UseGuards()
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.professionalService.remove(+id);
  }
}
