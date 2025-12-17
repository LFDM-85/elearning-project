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
exports.AssessmentsController = void 0;
const common_1 = require("@nestjs/common");
const assessments_service_1 = require("./assessments.service");
const create_assessment_dto_1 = require("./dto/create-assessment.dto");
const update_assessment_dto_1 = require("./dto/update-assessment.dto");
const swagger_1 = require("@nestjs/swagger");
let AssessmentsController = class AssessmentsController {
    constructor(assessmentsService) {
        this.assessmentsService = assessmentsService;
    }
    create(createAssessmentDto) {
        return this.assessmentsService.create(createAssessmentDto);
    }
    findAll() {
        return this.assessmentsService.findAll();
    }
    update(id, updateAssessmentDto) {
        return this.assessmentsService.update(id, updateAssessmentDto);
    }
    addAssessment(userId, assessmentId) {
        return this.assessmentsService.addUser(userId, assessmentId);
    }
    removeAssessment(userId, assessmentId) {
        return this.assessmentsService.removeUser(userId, assessmentId);
    }
    getAssessment(assessmentId) {
        return this.assessmentsService.getUsers(assessmentId);
    }
    remove(id) {
        return this.assessmentsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_assessment_dto_1.CreateAssessmentDto]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_assessment_dto_1.UpdateAssessmentDto]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('/:id/add-user/:assessmentId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('assessmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "addAssessment", null);
__decorate([
    (0, common_1.Patch)('/:id/remove-user/:assessmentId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('assessmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "removeAssessment", null);
__decorate([
    (0, common_1.Get)('/:assessmentId/users'),
    __param(0, (0, common_1.Param)('assessmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "getAssessment", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AssessmentsController.prototype, "remove", null);
AssessmentsController = __decorate([
    (0, swagger_1.ApiTags)('Assessments'),
    (0, common_1.Controller)('assessments'),
    __metadata("design:paramtypes", [assessments_service_1.AssessmentsService])
], AssessmentsController);
exports.AssessmentsController = AssessmentsController;
//# sourceMappingURL=assessments.controller.js.map