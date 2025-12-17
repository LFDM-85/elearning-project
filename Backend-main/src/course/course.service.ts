import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UpdateCourseDto } from './dto/update-course.dto'
import { Course, CourseDocument } from './schema/course.schema'

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<CourseDocument>) {}

  async create(nameCourse: string, open: boolean) {
    const findOneCourse = await this.courseModel.findOne({ nameCourse })

    if (findOneCourse) throw new BadRequestException('Course already exist!')

    const oneCourse = await this.courseModel.create({ nameCourse, open })

    return oneCourse.save()
  }

  async findAll() {
    return this.courseModel.find().populate('user', 'lecture')
  }

  async findOne(nameCourse: string) {
    if (!nameCourse)
      throw new BadRequestException(`Class with this name: ${nameCourse} does not exist!`)
    return this.courseModel.findOne({ nameCourse }).exec()
  }

  async findId(id: string) {
    if (!id) throw new BadRequestException(`Course with this name: ${id} does not exist!`)
    return this.courseModel.findOne({ id }).exec()
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return await this.courseModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $addToSet: { updateCourseDto },
      },
      { new: true },
    )
  }

  async addUser(userId: string, courseId: string) {
    return this.courseModel.findByIdAndUpdate(courseId, { $set: { user: userId } }, { new: true })
  }

  async removeUser(userId: string, courseId: string) {
    return this.courseModel.findByIdAndUpdate(courseId, { $pull: { user: userId } }, { new: true })
  }

  async getUsers(courseId: string) {
    return await this.courseModel.findById(courseId).populate('user')
  }

  async addLecture(lectureId: string, courseId: string) {
    return this.courseModel.findByIdAndUpdate(
      courseId,
      { $set: { lecture: lectureId } },
      { new: false },
    )
  }

  async removeLecture(lectureId: string, courseId: string) {
    return this.courseModel.findByIdAndUpdate(
      courseId,
      { $pull: { lecture: lectureId } },
      { new: true },
    )
  }

  async getLectures(courseId: string) {
    return await this.courseModel.findById(courseId).populate('lecture')
  }

  async remove(nameCourse: string) {
    return this.courseModel.deleteOne({ nameCourse }).exec()
  }
}
