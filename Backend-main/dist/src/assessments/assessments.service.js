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
exports.AssessmentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const assessments_schema_1 = require("./schema/assessments.schema");
let AssessmentsService = class AssessmentsService {
    constructor(assessmentModel) {
        this.assessmentModel = assessmentModel;
    }
    async create(createAssessmentDto) {
        return await (await this.assessmentModel.create(createAssessmentDto)).save();
    }
    findAll() {
        return this.assessmentModel.find();
    }
    async update(id, updateAssessmentDto) {
        return await this.assessmentModel.findByIdAndUpdate({
            _id: id,
        }, {
            $push: updateAssessmentDto
        }, { new: true });
    }
    async addUser(userId, assessmentId) {
        return this.assessmentModel.findByIdAndUpdate(assessmentId, { $set: { user: userId } }, { new: true });
    }
    async removeUser(userId, assessmentId) {
        return this.assessmentModel.findByIdAndUpdate(assessmentId, { $pull: { user: userId } }, { new: true });
    }
    async getUsers(assessmentId) {
        const assessment = await this.assessmentModel.findById(assessmentId).populate('user');
        return assessment;
    }
    remove(id) {
        return this.assessmentModel.deleteOne({ id }).exec();
    }
};
AssessmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(assessments_schema_1.Assessment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AssessmentsService);
exports.AssessmentsService = AssessmentsService;
//# sourceMappingURL=assessments.service.js.map