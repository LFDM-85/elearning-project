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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("./schema/users.schema");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    async findAll() {
        return await this.userModel
            .find()
            .populate({
            path: 'courses',
            populate: [
                {
                    path: 'lecture',
                    populate: [{ path: 'assessment' }, { path: 'work' }, { path: 'attendance' }],
                },
            ],
        })
            .exec();
    }
    async findById(id) {
        return this.userModel.findById(id);
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async update(id, updateUserDto) {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }
    async remove(id) {
        return this.userModel.findByIdAndDelete(id).exec();
    }
    async whoami(email) {
        return await this.userModel.findOne({ email }).exec();
    }
    async addCourse(userId, courseId) {
        return this.userModel.findByIdAndUpdate(userId, { $set: { courses: courseId } }, { new: true });
    }
    async removeCourse(userId, courseId) {
        return this.userModel.findByIdAndUpdate(userId, { $pull: { courses: courseId } }, { new: true });
    }
    async getCourses(email) {
        const user = await this.userModel.findOne({ email }).populate({
            path: 'courses',
            populate: [
                {
                    path: 'lecture',
                    populate: [{ path: 'assessment' }, { path: 'work' }, { path: 'attendance' }],
                },
            ],
        });
        console.log(`[UsersService] getCourses for ${email}:`, JSON.stringify(user, null, 2));
        return user;
    }
    async addWork(userId, workId) {
        return this.userModel.findByIdAndUpdate(userId, { $addToSet: { work: workId } }, { new: true });
    }
    async removeWork(userId, workId) {
        return this.userModel.findByIdAndUpdate(userId, { $pull: { work: workId } }, { new: true });
    }
    async getWork(userId) {
        const user = await this.userModel.findById(userId).populate('work');
        return user;
    }
    async addAssessment(userId, assessmentId) {
        return this.userModel.findByIdAndUpdate(userId, { $addToSet: { assessment: assessmentId } }, { new: true });
    }
    async removeAssessment(userId, assessmentId) {
        return this.userModel.findByIdAndUpdate(userId, { $pull: { assessment: assessmentId } }, { new: true });
    }
    async getAssessment(email) {
        const user = await this.userModel.findOne({ email });
        return user;
    }
    async addAttendance(userId, attendanceId) {
        return this.userModel.findByIdAndUpdate(userId, { $addToSet: { attendance: attendanceId } }, { new: true });
    }
    async removeAttendance(userId, attendanceId) {
        return this.userModel.findByIdAndUpdate(userId, { $pull: { attendance: attendanceId } }, { new: true });
    }
    async getAttendance(userId) {
        const user = await this.userModel.findById(userId).populate('attendance');
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.Users.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map