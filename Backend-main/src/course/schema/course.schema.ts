import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Transform } from 'class-transformer'
import mongoose, { Document } from 'mongoose'
import { Users } from 'src/users/schema/users.schema'
import { Lecture } from 'src/lectures/schema/lectures.schema'

export type CourseDocument = Course & Document
@Schema()
export class Course {
  @Transform(({ value }) => value.toString())
  _id: string
  @Prop()
  nameCourse: string
  @Prop()
  open: boolean
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }] })
  user: Users[]
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Lecture.name }] })
  lecture: [Lecture]
}

export const CourseSchema = SchemaFactory.createForClass(Course)
