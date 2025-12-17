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
exports.WorkService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const work_schema_1 = require("./schema/work.schema");
let WorkService = class WorkService {
    constructor(workModel, cloudinary) {
        this.workModel = workModel;
        this.cloudinary = cloudinary;
    }
    async create(createWorkDto) {
        const { filename } = createWorkDto;
        const findOneWork = await this.workModel.findOne({ filename });
        if (findOneWork)
            throw new common_1.BadRequestException('Work already exist! Please change the name of the file and try again.');
        return await (await this.workModel.create(createWorkDto)).save();
    }
    async uploadFileToCloudinary(file) {
        return await this.cloudinary.uploadfile(file);
    }
    findAll() {
        return this.workModel.find();
    }
    findOne(id) {
        return this.workModel.findById(id);
    }
    async update(id, updateWorkDto) {
        return await this.workModel.findByIdAndUpdate({
            _id: id,
        }, {
            $push: updateWorkDto,
        }, { new: true });
    }
    async addUser(userId, workId) {
        return this.workModel.findByIdAndUpdate(workId, { $set: { user: userId } }, { new: true });
    }
    async removeUser(userId, workId) {
        return this.workModel.findByIdAndUpdate(workId, { $pull: { user: userId } }, { new: true });
    }
    async getUsers(workId) {
        const assessment = await this.workModel.findById(workId).populate('user');
        return assessment;
    }
    async remove(id) {
        return this.workModel.deleteOne({ id }).exec();
    }
};
WorkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(work_schema_1.Work.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], WorkService);
exports.WorkService = WorkService;
//# sourceMappingURL=work.service.js.map