import { Module } from '@nestjs/common'
import { LecturesService } from './lectures.service'
import { LecturesController } from './lectures.controller'
import { CourseModule } from '../course/course.module'
import { MongooseModule } from '@nestjs/mongoose'
import { Lecture, LectureSchema } from './schema/lectures.schema'

@Module({
  imports: [
    CourseModule,
    MongooseModule.forFeature([{ name: Lecture.name, schema: LectureSchema }]),
  ],
  controllers: [LecturesController],
  providers: [LecturesService],
})
export class LecturesModule {}
