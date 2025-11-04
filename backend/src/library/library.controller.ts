import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  findAll() {
    return this.libraryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libraryService.findOne(Number(id));
  }

  @Post()
  create(@Body() body: { title: string; description: string; content: string; icon?: string }) {
    return this.libraryService.create(body);
  }
}
