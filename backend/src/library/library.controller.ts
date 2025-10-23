import { Controller, Get, Post, Body } from '@nestjs/common';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(private readonly libraryService: LibraryService) {}

  @Get()
  findAll() {
    return this.libraryService.findAll();
  }

  @Post()
  create(@Body() body: { title: string; description: string; icon?: string }) {
    return this.libraryService.create(body);
  }
}
