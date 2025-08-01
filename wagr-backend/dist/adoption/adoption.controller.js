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
exports.AdoptionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const adoption_service_1 = require("./adoption.service");
const create_adoption_profile_dto_1 = require("./dto/create-adoption-profile.dto");
const update_adoption_profile_dto_1 = require("./dto/update-adoption-profile.dto");
let AdoptionController = class AdoptionController {
    constructor(adoptionService) {
        this.adoptionService = adoptionService;
    }
    async createAdoptionProfile(req, dogId, createAdoptionProfileDto) {
        return this.adoptionService.createAdoptionProfile(dogId, req.user.id, createAdoptionProfileDto);
    }
    async findAllAdoptionProfiles() {
        return this.adoptionService.findAllAdoptionProfiles();
    }
    async findAdoptionProfile(id) {
        return this.adoptionService.findAdoptionProfile(id);
    }
    async updateAdoptionProfile(req, id, updateAdoptionProfileDto) {
        return this.adoptionService.updateAdoptionProfile(id, req.user.id, updateAdoptionProfileDto);
    }
    async createAdoptionApplication(req, adoptionProfileId, body) {
        return this.adoptionService.createAdoptionApplication(adoptionProfileId, req.user.id, body.message);
    }
    async getAdoptionApplications(req) {
        return this.adoptionService.getAdoptionApplications(req.user.id);
    }
    async updateAdoptionApplicationStatus(req, applicationId, body) {
        return this.adoptionService.updateAdoptionApplicationStatus(applicationId, req.user.id, body.status);
    }
};
exports.AdoptionController = AdoptionController;
__decorate([
    (0, common_1.Post)('profiles/:dogId'),
    (0, swagger_1.ApiOperation)({ summary: 'Create an adoption profile for a dog' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Adoption profile created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('dogId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_adoption_profile_dto_1.CreateAdoptionProfileDto]),
    __metadata("design:returntype", Promise)
], AdoptionController.prototype, "createAdoptionProfile", null);
__decorate([
    (0, common_1.Get)('profiles'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all available adoption profiles' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Adoption profiles retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdoptionController.prototype, "findAllAdoptionProfiles", null);
__decorate([
    (0, common_1.Get)('profiles/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific adoption profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Adoption profile retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdoptionController.prototype, "findAdoptionProfile", null);
__decorate([
    (0, common_1.Put)('profiles/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an adoption profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Adoption profile updated successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_adoption_profile_dto_1.UpdateAdoptionProfileDto]),
    __metadata("design:returntype", Promise)
], AdoptionController.prototype, "updateAdoptionProfile", null);
__decorate([
    (0, common_1.Post)('profiles/:id/applications'),
    (0, swagger_1.ApiOperation)({ summary: 'Create an adoption application' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Adoption application created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdoptionController.prototype, "createAdoptionApplication", null);
__decorate([
    (0, common_1.Get)('applications'),
    (0, swagger_1.ApiOperation)({ summary: 'Get adoption applications for user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Adoption applications retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdoptionController.prototype, "getAdoptionApplications", null);
__decorate([
    (0, common_1.Put)('applications/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update adoption application status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Adoption application status updated successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], AdoptionController.prototype, "updateAdoptionApplicationStatus", null);
exports.AdoptionController = AdoptionController = __decorate([
    (0, swagger_1.ApiTags)('Adoption'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('adoption'),
    __metadata("design:paramtypes", [adoption_service_1.AdoptionService])
], AdoptionController);
//# sourceMappingURL=adoption.controller.js.map