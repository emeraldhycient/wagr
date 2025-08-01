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
exports.SocializationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const socialization_service_1 = require("./socialization.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const update_event_dto_1 = require("./dto/update-event.dto");
let SocializationController = class SocializationController {
    constructor(socializationService) {
        this.socializationService = socializationService;
    }
    async createEvent(req, createEventDto) {
        return this.socializationService.create(req.user.id, createEventDto);
    }
    async findAllEvents() {
        return this.socializationService.findAll();
    }
    async findOneEvent(id) {
        return this.socializationService.findOne(id);
    }
    async updateEvent(req, id, updateEventDto) {
        return this.socializationService.update(id, req.user.id, updateEventDto);
    }
    async removeEvent(req, id) {
        return this.socializationService.remove(id, req.user.id);
    }
    async joinEvent(req, eventId, body) {
        return this.socializationService.joinEvent(eventId, body.dogId, req.user.id);
    }
    async leaveEvent(req, eventId, body) {
        return this.socializationService.leaveEvent(eventId, body.dogId, req.user.id);
    }
};
exports.SocializationController = SocializationController;
__decorate([
    (0, common_1.Post)('events'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new event' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Event created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_event_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], SocializationController.prototype, "createEvent", null);
__decorate([
    (0, common_1.Get)('events'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all events' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Events retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SocializationController.prototype, "findAllEvents", null);
__decorate([
    (0, common_1.Get)('events/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific event' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SocializationController.prototype, "findOneEvent", null);
__decorate([
    (0, common_1.Put)('events/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an event' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event updated successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_event_dto_1.UpdateEventDto]),
    __metadata("design:returntype", Promise)
], SocializationController.prototype, "updateEvent", null);
__decorate([
    (0, common_1.Delete)('events/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an event' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Event deleted successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SocializationController.prototype, "removeEvent", null);
__decorate([
    (0, common_1.Post)('events/:id/join'),
    (0, swagger_1.ApiOperation)({ summary: 'Join an event with a dog' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Joined event successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SocializationController.prototype, "joinEvent", null);
__decorate([
    (0, common_1.Post)('events/:id/leave'),
    (0, swagger_1.ApiOperation)({ summary: 'Leave an event with a dog' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Left event successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], SocializationController.prototype, "leaveEvent", null);
exports.SocializationController = SocializationController = __decorate([
    (0, swagger_1.ApiTags)('Socialization'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('socialization'),
    __metadata("design:paramtypes", [socialization_service_1.SocializationService])
], SocializationController);
//# sourceMappingURL=socialization.controller.js.map