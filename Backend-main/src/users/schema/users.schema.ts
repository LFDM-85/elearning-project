import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Exclude, Transform } from 'class-transformer'
import mongoose, { Document } from 'mongoose'
import { Course } from '../../course/schema/course.schema'

export type UserDocument = Users & Document
@Schema()
export class Users {
  @Transform(({ value }) => value.toString())
  _id: string
  @Prop()
  name: string
  @Prop()
  image: string
  @Prop({ require: true, unique: true })
  email: string
  @Prop({ require: true })
  password: string
  @Prop()
  roles: string[]
  @Prop()
  isValidated: boolean
  @Prop()
  @Exclude()
  refreshToken?: string
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: Course.name }] })
  courses: [Course]
}

export const UsersSchema = SchemaFactory.createForClass(Users)
