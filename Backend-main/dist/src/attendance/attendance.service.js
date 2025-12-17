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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const attendance_schema_1 = require("./schema/attendance.schema");
let AttendanceService = class AttendanceService {
    constructor(attendanceModel) {
        this.attendanceModel = attendanceModel;
    }
    async create(createAttendanceDto) {
        return await (await this.attendanceModel.create(createAttendanceDto)).save();
    }
    findAll() {
        return this.attendanceModel.find();
    }
    findOne(id) {
        return this.attendanceModel.findById(id);
    }
    async update(id, updateAttendanceDto) {
        return await this.attendanceModel.findByIdAndUpdate({
            _id: id,
        }, {
            $push: updateAttendanceDto,
        }, { new: true });
    }
    async addUser(userId, attendanceId) {
        return this.attendanceModel.findByIdAndUpdate(attendanceId, { $set: { user: userId } }, { new: true });
    }
    async removeUser(userId, attendanceId) {
        return this.attendanceModel.findByIdAndUpdate(attendanceId, { $pull: { user: userId } }, { new: true });
    }
    async getUsers(attendanceId) {
        const assessment = await this.attendanceModel.findById(attendanceId).populate('user');
        return assessment;
    }
    remove(id) {
        return this.attendanceModel.deleteOne({ id }).exec();
    }
};
AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(attendance_schema_1.Attendance.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AttendanceService);
exports.AttendanceService = AttendanceService;
//# sourceMappingURL=attendance.service.js.map