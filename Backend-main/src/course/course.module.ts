import { Module } from '@nestjs/common'
import { CourseService } from './course.service'
import { CourseController } from './course.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Course, CourseSchema } from './schema/course.schema'
import { UsersModule } from '../users/users.module'

@Module({
  imports: [UsersModule, MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
