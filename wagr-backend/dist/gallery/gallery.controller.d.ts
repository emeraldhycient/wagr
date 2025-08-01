import { GalleryService } from './gallery.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class GalleryController {
    private readonly galleryService;
    constructor(galleryService: GalleryService);
    createPost(req: any, createPostDto: CreatePostDto): Promise<{
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
    updatePost(req: any, id: string, updatePostDto: UpdatePostDto): Promise<{
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
    deletePost(req: any, id: string): Promise<{
        message: string;
    }>;
    likePost(req: any, postId: string): Promise<{
        message: string;
    }>;
    unlikePost(req: any, postId: string): Promise<{
        message: string;
    }>;
    createComment(req: any, postId: string, body: {
        content: string;
    }): Promise<{
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
    deleteComment(req: any, commentId: string): Promise<{
        message: string;
    }>;
}
