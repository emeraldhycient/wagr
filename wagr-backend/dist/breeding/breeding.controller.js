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
exports.BreedingController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const breeding_service_1 = require("./breeding.service");
const create_breeding_profile_dto_1 = require("./dto/create-breeding-profile.dto");
const update_breeding_profile_dto_1 = require("./dto/update-breeding-profile.dto");
let BreedingController = class BreedingController {
    constructor(breedingService) {
        this.breedingService = breedingService;
    }
    async createBreedingProfile(req, dogId, createBreedingProfileDto) {
        return this.breedingService.createBreedingProfile(dogId, req.user.id, createBreedingProfileDto);
    }
    async findAllBreedingProfiles() {
        return this.breedingService.findAllBreedingProfiles();
    }
    async findBreedingProfile(id) {
        return this.breedingService.findBreedingProfile(id);
    }
    async updateBreedingProfile(req, id, updateBreedingProfileDto) {
        return this.breedingService.updateBreedingProfile(id, req.user.id, updateBreedingProfileDto);
    }
    async createBreedingRequest(req, breedingProfileId, body) {
        return this.breedingService.createBreedingRequest(breedingProfileId, req.user.id, body.message);
    }
    async getBreedingRequests(req) {
        return this.breedingService.getBreedingRequests(req.user.id);
    }
    async updateBreedingRequestStatus(req, requestId, body) {
        return this.breedingService.updateBreedingRequestStatus(requestId, req.user.id, body.status);
    }
};
exports.BreedingController = BreedingController;
__decorate([
    (0, common_1.Post)('profiles/:dogId'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a breeding profile for a dog' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Breeding profile created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('dogId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_breeding_profile_dto_1.CreateBreedingProfileDto]),
    __metadata("design:returntype", Promise)
], BreedingController.prototype, "createBreedingProfile", null);
__decorate([
    (0, common_1.Get)('profiles'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available breeding profiles' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Breeding profiles retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BreedingController.prototype, "findAllBreedingProfiles", null);
__decorate([
    (0, common_1.Get)('profiles/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific breeding profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Breeding profile retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BreedingController.prototype, "findBreedingProfile", null);
__decorate([
    (0, common_1.Put)('profiles/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a breeding profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Breeding profile updated successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_breeding_profile_dto_1.UpdateBreedingProfileDto]),
    __metadata("design:returntype", Promise)
], BreedingController.prototype, "updateBreedingProfile", null);
__decorate([
    (0, common_1.Post)('profiles/:id/requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a breeding request' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Breeding request created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BreedingController.prototype, "createBreedingRequest", null);
__decorate([
    (0, common_1.Get)('requests'),
    (0, swagger_1.ApiOperation)({ summary: 'Get breeding requests for user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Breeding requests retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BreedingController.prototype, "getBreedingRequests", null);
__decorate([
    (0, common_1.Put)('requests/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update breeding request status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Breeding request status updated successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], BreedingController.prototype, "updateBreedingRequestStatus", null);
exports.BreedingController = BreedingController = __decorate([
    (0, swagger_1.ApiTags)('Breeding'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('breeding'),
    __metadata("design:paramtypes", [breeding_service_1.BreedingService])
], BreedingController);
//# sourceMappingURL=breeding.controller.js.map