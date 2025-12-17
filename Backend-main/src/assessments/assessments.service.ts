import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { UpdateAssessmentDto } from './dto/update-assessment.dto';
import { Assessment, AssessmentDocument } from './schema/assessments.schema';

@Injectable()
export class AssessmentsService {
  constructor(@InjectModel(Assessment.name) private assessmentModel: Model<AssessmentDocument>) {}
  async create(createAssessmentDto: CreateAssessmentDto) {
    return await(await this.assessmentModel.create(createAssessmentDto)).save();
  }

  findAll() {
    return this.assessmentModel.find();
  }

  async update(id: string, updateAssessmentDto: UpdateAssessmentDto) {
    return await this.assessmentModel.findByIdAndUpdate(
      {
        _id:id,
      },
      {
        $push: updateAssessmentDto
      },
      {new: true}
    );
  }

  async addUser(userId: string, assessmentId: string) {
    return this.assessmentModel.findByIdAndUpdate(
      assessmentId,
      { $set:  { user: userId }},
  { new: true}
    )
  }

  async removeUser(userId: string, assessmentId: string) {
    return this.assessmentModel.findByIdAndUpdate(
      assessmentId,
      { $pull: { user: userId } },
      { new: true}
    )
  }

   async getUsers(assessmentId: string) {
    const assessment = await this.assessmentModel.findById(assessmentId).populate('user');
    return assessment;
   }
  

  remove(id: string) {
    return this.assessmentModel.deleteOne({id}).exec();
  }
}
