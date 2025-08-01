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
exports.ServicesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const services_service_1 = require("./services.service");
const create_service_provider_dto_1 = require("./dto/create-service-provider.dto");
const update_service_provider_dto_1 = require("./dto/update-service-provider.dto");
const create_booking_dto_1 = require("./dto/create-booking.dto");
const update_booking_status_dto_1 = require("./dto/update-booking-status.dto");
let ServicesController = class ServicesController {
    constructor(servicesService) {
        this.servicesService = servicesService;
    }
    async createServiceProvider(req, createServiceProviderDto) {
        return this.servicesService.createServiceProvider(req.user.id, createServiceProviderDto);
    }
    async findAllServiceProviders() {
        return this.servicesService.findAllServiceProviders();
    }
    async findServiceProvider(id) {
        return this.servicesService.findServiceProvider(id);
    }
    async updateServiceProvider(req, id, updateServiceProviderDto) {
        return this.servicesService.updateServiceProvider(id, req.user.id, updateServiceProviderDto);
    }
    async createBooking(req, createBookingDto) {
        return this.servicesService.createBooking(req.user.id, createBookingDto);
    }
    async findAllBookings(req) {
        return this.servicesService.findAllBookings(req.user.id);
    }
    async findBooking(req, id) {
        return this.servicesService.findBooking(id, req.user.id);
    }
    async updateBookingStatus(req, id, updateBookingStatusDto) {
        return this.servicesService.updateBookingStatus(id, req.user.id, updateBookingStatusDto.status);
    }
    async createReview(req, bookingId, body) {
        return this.servicesService.createReview(bookingId, req.user.id, body.rating, body.comment);
    }
};
exports.ServicesController = ServicesController;
__decorate([
    (0, common_1.Post)('providers'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a service provider profile' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Service provider profile created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_service_provider_dto_1.CreateServiceProviderDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "createServiceProvider", null);
__decorate([
    (0, common_1.Get)('providers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all verified service providers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service providers retrieved successfully' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findAllServiceProviders", null);
__decorate([
    (0, common_1.Get)('providers/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific service provider' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service provider retrieved successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findServiceProvider", null);
__decorate([
    (0, common_1.Put)('providers/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a service provider profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Service provider profile updated successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_service_provider_dto_1.UpdateServiceProviderDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "updateServiceProvider", null);
__decorate([
    (0, common_1.Post)('bookings'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new booking' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Booking created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_booking_dto_1.CreateBookingDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "createBooking", null);
__decorate([
    (0, common_1.Get)('bookings'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all bookings for user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bookings retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findAllBookings", null);
__decorate([
    (0, common_1.Get)('bookings/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific booking' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking retrieved successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "findBooking", null);
__decorate([
    (0, common_1.Put)('bookings/:id/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Update booking status' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Booking status updated successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_booking_status_dto_1.UpdateBookingStatusDto]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "updateBookingStatus", null);
__decorate([
    (0, common_1.Post)('bookings/:id/reviews'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a review for a booking' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Review created successfully' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], ServicesController.prototype, "createReview", null);
exports.ServicesController = ServicesController = __decorate([
    (0, swagger_1.ApiTags)('Services'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('services'),
    __metadata("design:paramtypes", [services_service_1.ServicesService])
], ServicesController);
//# sourceMappingURL=services.controller.js.map