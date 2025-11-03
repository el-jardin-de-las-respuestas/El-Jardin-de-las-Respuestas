import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) { }

  @Get('forums')
  getAllForums() {
    return this.forumService.getAllForums();
  }

  @Get('posts')
  getAllPosts() {
    return this.forumService.getAllPosts();
  }

  @Post('posts')
  @UseGuards(JwtAuthGuard)
  createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.forumService.createPost(req.user.sub, createPostDto);
  }

  @Post('posts/:id/like')
  @UseGuards(JwtAuthGuard)
  toggleLike(@Param('id') id: string, @Request() req) {
    return this.forumService.toggleLike(+id, req.user.sub);
  }

  @Get('posts/:id/comments')
  getComments(@Param('id') id: string) {
    return this.forumService.getComments(+id);
  }

  @Post('posts/:id/comments')
  @UseGuards(JwtAuthGuard)
  createComment(
    @Param('id') id: string,
    @Request() req,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return this.forumService.createComment(+id, req.user.sub, createCommentDto);
  }
  @Post('forums')
  @UseGuards(JwtAuthGuard)
  createForum(@Request() req, @Body() createForumDto: { title: string; description: string }) {
    return this.forumService.createForum(req.user.sub, createForumDto);
  }
}