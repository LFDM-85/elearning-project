import mongoose, { Document } from 'mongoose';
import { Users } from 'src/users/schema/users.schema';
import { Lecture } from 'src/lectures/schema/lectures.schema';
export type CourseDocument = Course & Document;
export declare class Course {
    _id: string;
    nameCourse: string;
    open: boolean;
    user: Users[];
    lecture: [Lecture];
}
export declare const CourseSchema: mongoose.Schema<Course, mongoose.Model<Course, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Course>;
