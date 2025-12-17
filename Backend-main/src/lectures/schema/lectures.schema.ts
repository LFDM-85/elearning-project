import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Transform } from 'class-transformer'
import mongoose from 'mongoose'
import { Assessment } from 'src/assessments/schema/assessments.schema'
import { Attendance } from 'src/attendance/schema/attendance.schema'
import { Work } from 'src/work/schema/work.schema'

export type LectureDocument = Lecture & Document
@Schema()
export class Lecture {
  @Transform(({ value }) => value.toString())
  _id: string
  @Prop()
  summary: string
  @Prop()
  description: string
  @Prop()
  finished: boolean
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Assessment.name }] })
  assessment: Assessment[]
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Work.name }] })
  work: Work[]
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Attendance.name })
  attendance: Attendance
}

export const LectureSchema = SchemaFactory.createForClass(Lecture)
