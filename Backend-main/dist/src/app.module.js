"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const users_module_1 = require("./users/users.module");
const auth_module_1 = require("./auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
const dotenv = require("dotenv");
const course_module_1 = require("./course/course.module");
const lectures_module_1 = require("./lectures/lectures.module");
const assessments_module_1 = require("./assessments/assessments.module");
const work_module_1 = require("./work/work.module");
const attendance_module_1 = require("./attendance/attendance.module");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const config_1 = require("@nestjs/config");
dotenv.config();
const URL = process.env.DATABASE_URL;
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(URL),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            course_module_1.CourseModule,
            lectures_module_1.LecturesModule,
            assessments_module_1.AssessmentsModule,
            work_module_1.WorkModule,
            attendance_module_1.AttendanceModule,
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map