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
exports.DogsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const dogs_service_1 = require("./dogs.service");
const create_dog_dto_1 = require("./dto/create-dog.dto");
const update_dog_dto_1 = require("./dto/update-dog.dto");
let DogsController = class DogsController {
    constructor(dogsService) {
        this.dogsService = dogsService;
    }
    async create(req, createDogDto) {
        return this.dogsService.create(req.user.id, createDogDto);
    }
    async findAll(req) {
        return this.dogsService.findAll(req.user.id);
    }
    async findOne(req, id) {
        return this.dogsService.findOne(id, req.user.id);
    }
    async update(req, id, updateDogDto) {
        return this.dogsService.update(id, req.user.id, updateDogDto);
    }
    async remove(req, id) {
        return this.dogsService.remove(id, req.user.id);
    }
    async addPhoto(req, id, file) {
        const photoUrl = `https://example.com/dogs/${id}/photos/${file.filename}`;
        return this.dogsService.addPhoto(id, req.user.id, photoUrl);
    }
};
exports.DogsController = DogsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new dog profile' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Dog created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_dog_dto_1.CreateDogDto]),
    __metadata("design:returntype", Promise)
], DogsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all user dogs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dogs retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DogsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific dog' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dog retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DogsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a dog profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dog updated successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_dog_dto_1.UpdateDogDto]),
    __metadata("design:returntype", Promise)
], DogsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a dog profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dog deleted successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DogsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/photos'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('photo')),
    (0, swagger_1.ApiOperation)({ summary: 'Add photo to dog profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Photo added successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], DogsController.prototype, "addPhoto", null);
exports.DogsController = DogsController = __decorate([
    (0, swagger_1.ApiTags)('Dogs'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('dogs'),
    __metadata("design:paramtypes", [dogs_service_1.DogsService])
], DogsController);
//# sourceMappingURL=dogs.controller.js.map