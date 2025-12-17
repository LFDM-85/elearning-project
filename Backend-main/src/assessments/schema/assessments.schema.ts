import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Transform } from "class-transformer";


export type AssessmentDocument = Assessment & Document;

@Schema()
export class Assessment {
  @Transform(({ value }) => value.toString())
  _id: string;
  @Prop()
  assessmentValue: number;
  @Prop()
  userEmail: string;

}

export const AssessmentSchema = SchemaFactory.createForClass(Assessment);