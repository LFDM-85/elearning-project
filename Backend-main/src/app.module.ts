import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { MongooseModule } from '@nestjs/mongoose'
import * as dotenv from 'dotenv'
import { ThrottlerModule } from '@nestjs/throttler'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CourseModule } from './course/course.module'
import { LecturesModule } from './lectures/lectures.module'
import { AssessmentsModule } from './assessments/assessments.module'
import { WorkModule } from './work/work.module'
import { AttendanceModule } from './attendance/attendance.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { ConfigModule } from '@nestjs/config'

dotenv.config()

const URL = process.env.DATABASE_URL

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(URL),
    UsersModule,
    AuthModule,

    CourseModule,
    LecturesModule,
    AssessmentsModule,
    WorkModule,
    AttendanceModule,
    CloudinaryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
