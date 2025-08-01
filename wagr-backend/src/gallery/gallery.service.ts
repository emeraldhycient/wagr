import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class GalleryService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: string, createPostDto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        ...createPostDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePhoto: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
            photos: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    return post;
  }

  async findAllPosts() {
    return this.prisma.post.findMany({
      where: { isPublic: true },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePhoto: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
            photos: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPost(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePhoto: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
            photos: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profilePhoto: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async updatePost(id: string, userId: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }

    return this.prisma.post.update({
      where: { id },
      data: updatePostDto,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePhoto: true,
          },
        },
        dog: {
          select: {
            id: true,
            name: true,
            breed: true,
            photos: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
    });
  }

  async deletePost(id: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.userId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    await this.prisma.post.delete({
      where: { id },
    });

    return { message: 'Post deleted successfully' };
  }

  async likePost(postId: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Check if already liked
    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      throw new ForbiddenException('Post already liked');
    }

    await this.prisma.like.create({
      data: {
        userId,
        postId,
      },
    });

    return { message: 'Post liked successfully' };
  }

  async unlikePost(postId: string, userId: string) {
    const like = await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (!like) {
      throw new ForbiddenException('Post not liked');
    }

    await this.prisma.like.delete({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return { message: 'Post unliked successfully' };
  }

  async createComment(postId: string, userId: string, content: string) {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = await this.prisma.comment.create({
      data: {
        content,
        userId,
        postId,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profilePhoto: true,
          },
        },
      },
    });

    return comment;
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await this.prisma.comment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    await this.prisma.comment.delete({
      where: { id: commentId },
    });

    return { message: 'Comment deleted successfully' };
  }
} 