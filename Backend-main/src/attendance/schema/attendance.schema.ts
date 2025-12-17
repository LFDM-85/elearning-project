import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import mongoose from 'mongoose';
// import { Users } from '../../users/entities/user.entity';
import { Users } from 'src/users/schema/users.schema';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {
@Transform(({ value }) => value.toString())
  _id: string;
  @Prop()
  attendance: boolean;
  @Prop()
  validation: boolean;
  @Prop()
  filename: string;
  @Prop()
  filepath: string;
  @Prop()
  owner: string;
  // user: Users;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
