import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GalleryService } from './gallery.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@ApiTags('Gallery')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

  @Post('posts')
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  async createPost(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.galleryService.createPost(req.user.id, createPostDto);
  }

  @Get('posts')
  @ApiOperation({ summary: 'Get all public posts' })
  @ApiResponse({ status: 200, description: 'Posts retrieved successfully' })
  async findAllPosts() {
    return this.galleryService.findAllPosts();
  }

  @Get('posts/:id')
  @ApiOperation({ summary: 'Get a specific post' })
  @ApiResponse({ status: 200, description: 'Post retrieved successfully' })
  async findPost(@Param('id') id: string) {
    return this.galleryService.findPost(id);
  }

  @Put('posts/:id')
  @ApiOperation({ summary: 'Update a post' })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  async updatePost(@Request() req, @Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.galleryService.updatePost(id, req.user.id, updatePostDto);
  }

  @Delete('posts/:id')
  @ApiOperation({ summary: 'Delete a post' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  async deletePost(@Request() req, @Param('id') id: string) {
    return this.galleryService.deletePost(id, req.user.id);
  }

  @Post('posts/:id/like')
  @ApiOperation({ summary: 'Like a post' })
  @ApiResponse({ status: 200, description: 'Post liked successfully' })
  async likePost(@Request() req, @Param('id') postId: string) {
    return this.galleryService.likePost(postId, req.user.id);
  }

  @Delete('posts/:id/like')
  @ApiOperation({ summary: 'Unlike a post' })
  @ApiResponse({ status: 200, description: 'Post unliked successfully' })
  async unlikePost(@Request() req, @Param('id') postId: string) {
    return this.galleryService.unlikePost(postId, req.user.id);
  }

  @Post('posts/:id/comments')
  @ApiOperation({ summary: 'Create a comment on a post' })
  @ApiResponse({ status: 201, description: 'Comment created successfully' })
  async createComment(@Request() req, @Param('id') postId: string, @Body() body: { content: string }) {
    return this.galleryService.createComment(postId, req.user.id, body.content);
  }

  @Delete('comments/:id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 200, description: 'Comment deleted successfully' })
  async deleteComment(@Request() req, @Param('id') commentId: string) {
    return this.galleryService.deleteComment(commentId, req.user.id);
  }
} 