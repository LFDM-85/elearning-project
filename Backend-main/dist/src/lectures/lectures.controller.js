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
exports.LecturesController = void 0;
const common_1 = require("@nestjs/common");
const lectures_service_1 = require("./lectures.service");
const create_lecture_dto_1 = require("./dto/create-lecture.dto");
const update_lecture_dto_1 = require("./dto/update-lecture.dto");
const swagger_1 = require("@nestjs/swagger");
let LecturesController = class LecturesController {
    constructor(lecturesService) {
        this.lecturesService = lecturesService;
    }
    create(createLectureDto) {
        return this.lecturesService.create(createLectureDto);
    }
    findAll() {
        return this.lecturesService.findAll();
    }
    findOne(id) {
        return this.lecturesService.findOne(id);
    }
    update(id, updateLectureDto) {
        return this.lecturesService.update(id, updateLectureDto);
    }
    addAssessment(assessmentId, lectureId) {
        return this.lecturesService.addAssessment(assessmentId, lectureId);
    }
    removeAssessment(assessmentId, lectureId) {
        return this.lecturesService.removeAssessment(assessmentId, lectureId);
    }
    getAssessment(lectureId) {
        return this.lecturesService.getAssessment(lectureId);
    }
    addAttendance(attendanceId, lectureId) {
        return this.lecturesService.addAttendance(attendanceId, lectureId);
    }
    removeAttendance(attendanceId, lectureId) {
        return this.lecturesService.removeAttendance(attendanceId, lectureId);
    }
    getAttendance(lectureId) {
        return this.lecturesService.getAttendance(lectureId);
    }
    addWork(workId, lectureId) {
        return this.lecturesService.addWork(workId, lectureId);
    }
    removeWork(workId, lectureId) {
        return this.lecturesService.removeWork(workId, lectureId);
    }
    getWork(lectureId) {
        return this.lecturesService.getWork(lectureId);
    }
    remove(id) {
        return this.lecturesService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_lecture_dto_1.CreateLectureDto]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_lecture_dto_1.UpdateLectureDto]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('/:assessmentId/add-assessment/:lectureId'),
    __param(0, (0, common_1.Param)('assessmentId')),
    __param(1, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "addAssessment", null);
__decorate([
    (0, common_1.Patch)('/:assessmentId/remove-assessment/:lectureId'),
    __param(0, (0, common_1.Param)('assessmentId')),
    __param(1, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "removeAssessment", null);
__decorate([
    (0, common_1.Get)('/:lectureId/assessments'),
    __param(0, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "getAssessment", null);
__decorate([
    (0, common_1.Patch)('/:attendanceId/add-attendance/:lectureId'),
    __param(0, (0, common_1.Param)('attendanceId')),
    __param(1, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "addAttendance", null);
__decorate([
    (0, common_1.Patch)('/:attendanceId/remove-attendance/:lectureId'),
    __param(0, (0, common_1.Param)('attendanceId')),
    __param(1, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "removeAttendance", null);
__decorate([
    (0, common_1.Get)('/:classId/attendances'),
    __param(0, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "getAttendance", null);
__decorate([
    (0, common_1.Patch)('/:workId/add-work/:lectureId'),
    __param(0, (0, common_1.Param)('workId')),
    __param(1, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "addWork", null);
__decorate([
    (0, common_1.Patch)('/:workId/remove-work/:lectureId'),
    __param(0, (0, common_1.Param)('workId')),
    __param(1, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "removeWork", null);
__decorate([
    (0, common_1.Get)('/:lectureId/works'),
    __param(0, (0, common_1.Param)('lectureId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "getWork", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LecturesController.prototype, "remove", null);
LecturesController = __decorate([
    (0, swagger_1.ApiTags)('Lectures'),
    (0, common_1.Controller)('lectures'),
    __metadata("design:paramtypes", [lectures_service_1.LecturesService])
], LecturesController);
exports.LecturesController = LecturesController;
//# sourceMappingURL=lectures.controller.js.map