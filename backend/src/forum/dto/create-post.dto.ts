import { IsString, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  forumId: number;

  @IsBoolean()
  @IsOptional()
  isAnonymous?: boolean;
}