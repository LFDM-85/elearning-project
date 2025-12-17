import { Module } from '@nestjs/common';
import { AssessmentsService } from './assessments.service';
import { AssessmentsController } from './assessments.controller';
import { LecturesModule } from 'src/lectures/lectures.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Assessment, AssessmentSchema } from './schema/assessments.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    LecturesModule,
    MulterModule.register({ dest: './uploads/attendance/' }),
    MongooseModule.forFeature([
      { name: Assessment.name, schema: AssessmentSchema },
    ]),
  ],
  controllers: [AssessmentsController],
  providers: [AssessmentsService],
})
export class AssessmentsModule {}
