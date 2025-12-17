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
exports.LecturesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const lectures_schema_1 = require("./schema/lectures.schema");
let LecturesService = class LecturesService {
    constructor(lectureModel) {
        this.lectureModel = lectureModel;
    }
    async create(createLectureDto) {
        const { summary } = createLectureDto;
        const findOneLecture = await this.lectureModel.findOne({ summary });
        if (findOneLecture)
            throw new common_1.BadRequestException('Lecture already exist!');
        return await (await this.lectureModel.create(createLectureDto)).save();
    }
    findAll() {
        return this.lectureModel.find().populate('assessment');
    }
    async findOne(id) {
        return this.lectureModel.findOne({ id });
    }
    async update(id, updateLectureDto) {
        return await this.lectureModel.findByIdAndUpdate({
            _id: id,
        }, {
            $set: updateLectureDto,
        }, { new: true });
    }
    async addAssessment(assessmentId, lectureId) {
        return this.lectureModel.findByIdAndUpdate(lectureId, { $set: { assessment: assessmentId } }, { new: true });
    }
    async removeAssessment(assessmentId, lectureId) {
        return this.lectureModel.findByIdAndUpdate(lectureId, { $pull: { assessment: assessmentId } }, { new: true });
    }
    async getAssessment(lectureId) {
        return await (await this.lectureModel.findById(lectureId)).populate('assessment');
    }
    async addAttendance(attendanceId, lectureId) {
        return this.lectureModel.findByIdAndUpdate(lectureId, { $set: { attendance: attendanceId } }, { new: true });
    }
    async removeAttendance(attendanceId, lectureId) {
        return this.lectureModel.findByIdAndUpdate(lectureId, { $pull: { assessment: attendanceId } }, { new: true });
    }
    async getAttendance(lectureId) {
        return await this.lectureModel.findById(lectureId).populate('attendance');
    }
    async addWork(workId, lectureId) {
        return this.lectureModel.findByIdAndUpdate(lectureId, { $set: { work: workId } }, { new: true });
    }
    async removeWork(workId, lectureId) {
        return this.lectureModel.findByIdAndUpdate(lectureId, { $pull: { work: workId } }, { new: true });
    }
    async getWork(lectureId) {
        return await this.lectureModel.findById(lectureId).populate('work');
    }
    async remove(id) {
        return this.lectureModel.deleteOne({ id }).exec();
    }
};
LecturesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(lectures_schema_1.Lecture.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LecturesService);
exports.LecturesService = LecturesService;
//# sourceMappingURL=lectures.service.js.map