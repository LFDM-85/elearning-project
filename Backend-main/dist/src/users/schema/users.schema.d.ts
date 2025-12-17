import mongoose, { Document } from 'mongoose';
import { Course } from '../../course/schema/course.schema';
export type UserDocument = Users & Document;
export declare class Users {
    _id: string;
    name: string;
    image: string;
    email: string;
    password: string;
    roles: string[];
    isValidated: boolean;
    refreshToken?: string;
    courses: [Course];
}
export declare const UsersSchema: mongoose.Schema<Users, mongoose.Model<Users, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Users>;
