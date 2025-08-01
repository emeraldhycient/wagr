import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class GalleryService {
    private prisma;
    constructor(prisma: PrismaService);
    createPost(userId: string, createPostDto: CreatePostDto): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
            profilePhoto: string;
        };
        dog: {
            id: string;
            name: string;
            breed: string;
            photos: string[];
        };
        _count: {
            comments: number;
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        content: string | null;
        dogId: string | null;
        media: string[];
        hashtags: string[];
        isPublic: boolean;
    }>;
    findAllPosts(): Promise<({
        user: {
            firstName: string;
            lastName: string;
            id: string;
            profilePhoto: string;
        };
        dog: {
            id: string;
            name: string;
            breed: string;
            photos: string[];
        };
        _count: {
            comments: number;
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        content: string | null;
        dogId: string | null;
        media: string[];
        hashtags: string[];
        isPublic: boolean;
    })[]>;
    findPost(id: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
            profilePhoto: string;
        };
        dog: {
            id: string;
            name: string;
            breed: string;
            photos: string[];
        };
        comments: ({
            user: {
                firstName: string;
                lastName: string;
                id: string;
                profilePhoto: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            content: string;
            postId: string;
        })[];
        _count: {
            comments: number;
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        content: string | null;
        dogId: string | null;
        media: string[];
        hashtags: string[];
        isPublic: boolean;
    }>;
    updatePost(id: string, userId: string, updatePostDto: UpdatePostDto): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
            profilePhoto: string;
        };
        dog: {
            id: string;
            name: string;
            breed: string;
            photos: string[];
        };
        _count: {
            comments: number;
            likes: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        content: string | null;
        dogId: string | null;
        media: string[];
        hashtags: string[];
        isPublic: boolean;
    }>;
    deletePost(id: string, userId: string): Promise<{
        message: string;
    }>;
    likePost(postId: string, userId: string): Promise<{
        message: string;
    }>;
    unlikePost(postId: string, userId: string): Promise<{
        message: string;
    }>;
    createComment(postId: string, userId: string, content: string): Promise<{
        user: {
            firstName: string;
            lastName: string;
            id: string;
            profilePhoto: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        content: string;
        postId: string;
    }>;
    deleteComment(commentId: string, userId: string): Promise<{
        message: string;
    }>;
}
