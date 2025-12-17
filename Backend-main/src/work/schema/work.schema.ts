import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";
import mongoose from "mongoose";
// import { Users } from "src/users/entities/user.entity";
import { Users } from "src/users/schema/users.schema";

export type WorkDocument = Work & Document
@Schema()

export class Work {
  @Transform(({ value }) => value.toString())
  _id: string;
  @Prop()
  filename: string;
  @Prop()
  filepath: string;
   @Prop()
  owner: string;
}

export const WorkSchema = SchemaFactory.createForClass(Work)