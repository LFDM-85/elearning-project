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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const accessToken_guard_1 = require("../common/guards/accessToken.guard");
const swagger_1 = require("@nestjs/swagger");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    findAll() {
        console.log('GET /users endpoint hit. Attempting to find all users...');
        return this.usersService.findAll();
    }
    findByEmail(email) {
        return this.usersService.findByEmail(email);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
    addCourse(userId, courseId) {
        return this.usersService.addCourse(userId, courseId);
    }
    removeCourse(userId, courseId) {
        return this.usersService.removeCourse(userId, courseId);
    }
    getCourses(email) {
        return this.usersService.getCourses(email);
    }
    addWork(userId, workId) {
        return this.usersService.addWork(userId, workId);
    }
    removeWork(userId, workId) {
        return this.usersService.removeWork(userId, workId);
    }
    getWork(userId) {
        return this.usersService.getWork(userId);
    }
    addAssessment(userId, assessmentId) {
        return this.usersService.addAssessment(userId, assessmentId);
    }
    removeAssessment(userId, assessmentId) {
        return this.usersService.removeAssessment(userId, assessmentId);
    }
    getAssessment(userEmail) {
        return this.usersService.getAssessment(userEmail);
    }
    addAttendance(userId, attendanceId) {
        return this.usersService.addAttendance(userId, attendanceId);
    }
    removeAttendance(userId, attendanceId) {
        return this.usersService.removeAttendance(userId, attendanceId);
    }
    getAttendance(userId) {
        return this.usersService.getAttendance(userId);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findByEmail", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(accessToken_guard_1.AccessTokenGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)('/:id/add-course/:courseId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addCourse", null);
__decorate([
    (0, common_1.Patch)('/:id/remove-course/:courseId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeCourse", null);
__decorate([
    (0, common_1.Get)('/:email/courses'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getCourses", null);
__decorate([
    (0, common_1.Patch)('/:id/add-work/:workId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('workId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addWork", null);
__decorate([
    (0, common_1.Patch)('/:id/remove-work/:workId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('workId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeWork", null);
__decorate([
    (0, common_1.Get)('/:id/works'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getWork", null);
__decorate([
    (0, common_1.Patch)('/:id/add-assessment/:assessmentId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('assessmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addAssessment", null);
__decorate([
    (0, common_1.Patch)('/:id/remove-work/:assessmentId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('assessmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeAssessment", null);
__decorate([
    (0, common_1.Get)('/:email/assessments'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAssessment", null);
__decorate([
    (0, common_1.Patch)('/:id/add-attendance/:attendanceId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('attendanceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addAttendance", null);
__decorate([
    (0, common_1.Patch)('/:id/remove-attendance/:attendanceId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('attendanceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeAttendance", null);
__decorate([
    (0, common_1.Get)('/:id/attendances'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getAttendance", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map