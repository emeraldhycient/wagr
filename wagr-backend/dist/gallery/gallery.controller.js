"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalleryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const gallery_service_1 = require("./gallery.service");
const create_post_dto_1 = require("./dto/create-post.dto");
const update_post_dto_1 = require("./dto/update-post.dto");
let GalleryController = class GalleryController {
    constructor(galleryService) {
        this.galleryService = galleryService;
    }
    async createPost(req, createPostDto) {
        return this.galleryService.createPost(req.user.id, createPostDto);
    }
    async findAllPosts() {
        return this.galleryService.findAllPosts();
    }
    async findPost(id) {
        return this.galleryService.findPost(id);
    }
    async updatePost(req, id, updatePostDto) {
        return this.galleryService.updatePost(id, req.user.id, updatePostDto);
    }
    async deletePost(req, id) {
        return this.galleryService.deletePost(id, req.user.id);
    }
    async likePost(req, postId) {
        return this.galleryService.likePost(postId, req.user.id);
    }
    async unlikePost(req, postId) {
        return this.galleryService.unlikePost(postId, req.user.id);
    }
    async createComment(req, postId, body) {
        return this.galleryService.createComment(postId, req.user.id, body.content);
    }
    async deleteComment(req, commentId) {
        return this.galleryService.deleteComment(commentId, req.user.id);
    }
};
exports.GalleryController = GalleryController;
__decorate([
    (0, common_1.Post)('posts'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Post created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "createPost", null);
__decorate([
    (0, common_1.Get)('posts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all public posts' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Posts retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "findAllPosts", null);
__decorate([
    (0, common_1.Get)('posts/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "findPost", null);
__decorate([
    (0, common_1.Put)('posts/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post updated successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_post_dto_1.UpdatePostDto]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)('posts/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post deleted successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)('posts/:id/like'),
    (0, swagger_1.ApiOperation)({ summary: 'Like a post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post liked successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "likePost", null);
__decorate([
    (0, common_1.Delete)('posts/:id/like'),
    (0, swagger_1.ApiOperation)({ summary: 'Unlike a post' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Post unliked successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "unlikePost", null);
__decorate([
    (0, common_1.Post)('posts/:id/comments'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a comment on a post' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Comment created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "createComment", null);
__decorate([
    (0, common_1.Delete)('comments/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a comment' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Comment deleted successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], GalleryController.prototype, "deleteComment", null);
exports.GalleryController = GalleryController = __decorate([
    (0, swagger_1.ApiTags)('Gallery'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('gallery'),
    __metadata("design:paramtypes", [gallery_service_1.GalleryService])
], GalleryController);
//# sourceMappingURL=gallery.controller.js.map