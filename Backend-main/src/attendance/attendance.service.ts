import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { UpdateAttendanceDto } from './dto/update-attendance.dto'
import { Attendance, AttendanceDocument } from './schema/attendance.schema'

@Injectable()
export class AttendanceService {
  constructor(@InjectModel(Attendance.name) private attendanceModel: Model<AttendanceDocument>) {}

  async create(createAttendanceDto: CreateAttendanceDto) {
    //  const { filename} = createAttendanceDto
    // const findOneAttendance = await this.attendanceModel.findOne({ filename })
    // if(findOneAttendance) throw new BadRequestException('Attendance already exist! Please change the name of the file and try again.')
    return await (await this.attendanceModel.create(createAttendanceDto)).save()
  }

  findAll() {
    return this.attendanceModel.find()
  }

  findOne(id: string) {
    return this.attendanceModel.findById(id)
  }

  async update(id: string, updateAttendanceDto: UpdateAttendanceDto) {
    return await this.attendanceModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $push: updateAttendanceDto,
      },
      { new: true },
    )
  }

  async addUser(userId: string, attendanceId: string) {
    return this.attendanceModel.findByIdAndUpdate(
      attendanceId,
      { $set: { user: userId } },
      { new: true },
    )
  }

  async removeUser(userId: string, attendanceId: string) {
    return this.attendanceModel.findByIdAndUpdate(
      attendanceId,
      { $pull: { user: userId } },
      { new: true },
    )
  }

  async getUsers(attendanceId: string) {
    const assessment = await this.attendanceModel.findById(attendanceId).populate('user')
    return assessment
  }

  remove(id: string) {
    return this.attendanceModel.deleteOne({ id }).exec()
  }
}
