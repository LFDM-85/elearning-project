import mongoose from 'mongoose';
export type AttendanceDocument = Attendance & Document;
export declare class Attendance {
    _id: string;
    attendance: boolean;
    validation: boolean;
    filename: string;
    filepath: string;
    owner: string;
}
export declare const AttendanceSchema: mongoose.Schema<Attendance, mongoose.Model<Attendance, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Attendance>;
