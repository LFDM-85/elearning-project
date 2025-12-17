"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkModule = void 0;
const common_1 = require("@nestjs/common");
const work_service_1 = require("./work.service");
const work_controller_1 = require("./work.controller");
const lectures_module_1 = require("../lectures/lectures.module");
const users_module_1 = require("../users/users.module");
const mongoose_1 = require("@nestjs/mongoose");
const work_schema_1 = require("./schema/work.schema");
const platform_express_1 = require("@nestjs/platform-express");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const multer_1 = require("multer");
let WorkModule = class WorkModule {
};
WorkModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cloudinary_module_1.CloudinaryModule,
            lectures_module_1.LecturesModule,
            users_module_1.UsersModule,
            platform_express_1.MulterModule.register({ storage: (0, multer_1.memoryStorage)() }),
            mongoose_1.MongooseModule.forFeature([{ name: work_schema_1.Work.name, schema: work_schema_1.WorkSchema }]),
        ],
        controllers: [work_controller_1.WorkController],
        providers: [work_service_1.WorkService],
    })
], WorkModule);
exports.WorkModule = WorkModule;
//# sourceMappingURL=work.module.js.map