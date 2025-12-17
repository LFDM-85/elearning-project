/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    create(createAttendanceDto: CreateAttendanceDto): Promise<import("mongoose").Document<unknown, any, import("./schema/attendance.schema").AttendanceDocument> & Omit<import("./schema/attendance.schema").Attendance & Document & Required<{
        _id: string;
    }>, never>>;
    findFile(filename: any, res: any): any;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, any, import("./schema/attendance.schema").AttendanceDocument> & Omit<import("./schema/attendance.schema").Attendance & Document & Required<{
        _id: string;
    }>, never>)[], import("mongoose").Document<unknown, any, import("./schema/attendance.schema").AttendanceDocument> & Omit<import("./schema/attendance.schema").Attendance & Document & Required<{
        _id: string;
    }>, never>, {}, import("./schema/attendance.schema").AttendanceDocument>;
    update(id: string, updateAttendanceDto: UpdateAttendanceDto): Promise<import("mongoose").Document<unknown, any, import("./schema/attendance.schema").AttendanceDocument> & Omit<import("./schema/attendance.schema").Attendance & Document & Required<{
        _id: string;
    }>, never>>;
    addAttendance(userId: string, attendanceId: string): Promise<import("mongoose").Document<unknown, any, import("./schema/attendance.schema").AttendanceDocument> & Omit<import("./schema/attendance.schema").Attendance & Document & Required<{
        _id: string;
    }>, never>>;
    removeAttendance(userId: string, attendanceId: string): Promise<import("mongoose").Document<unknown, any, import("./schema/attendance.schema").AttendanceDocument> & Omit<import("./schema/attendance.schema").Attendance & Document & Required<{
        _id: string;
    }>, never>>;
    getAttendance(attendanceId: string): Promise<import("mongoose").Document<unknown, any, import("./schema/attendance.schema").AttendanceDocument> & Omit<import("./schema/attendance.schema").Attendance & Document & Required<{
        _id: string;
    }>, never>>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
