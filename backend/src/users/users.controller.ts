import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto,1);
  }

  @Roles('admin')
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  
  @Roles('admin')
  @Get(':id')
  findOneById(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @Roles('admin')
  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Roles('admin')
  @Patch(':id')
  updateById(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateById(id, updateUserDto);
  }
  
  @Roles('admin')
  @Delete(':id')
  removeById(@Param('id') id: number) {
    return this.usersService.removeById(id);
  }

}
