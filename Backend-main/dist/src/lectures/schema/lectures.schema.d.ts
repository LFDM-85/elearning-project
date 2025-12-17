import mongoose from 'mongoose';
import { Assessment } from 'src/assessments/schema/assessments.schema';
import { Attendance } from 'src/attendance/schema/attendance.schema';
import { Work } from 'src/work/schema/work.schema';
export type LectureDocument = Lecture & Document;
export declare class Lecture {
    _id: string;
    summary: string;
    description: string;
    finished: boolean;
    assessment: Assessment[];
    work: Work[];
    attendance: Attendance;
}
export declare const LectureSchema: mongoose.Schema<Lecture, mongoose.Model<Lecture, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Lecture>;
