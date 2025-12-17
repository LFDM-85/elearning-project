import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { CreateWorkDto } from './dto/create-work.dto'
import { UpdateWorkDto } from './dto/update-work.dto'
import { Work, WorkDocument } from './schema/work.schema'

@Injectable()
export class WorkService {
  constructor(
    @InjectModel(Work.name) private workModel: Model<WorkDocument>,
    private cloudinary: CloudinaryService,
  ) {}
  async create(createWorkDto: CreateWorkDto) {
    const { filename } = createWorkDto
    const findOneWork = await this.workModel.findOne({ filename })
    if (findOneWork)
      throw new BadRequestException(
        'Work already exist! Please change the name of the file and try again.',
      )
    return await (await this.workModel.create(createWorkDto)).save()
  }

  async uploadFileToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadfile(file)
  }

  findAll() {
    return this.workModel.find()
  }

  findOne(id: string) {
    return this.workModel.findById(id)
  }

  async update(id: string, updateWorkDto: UpdateWorkDto) {
    return await this.workModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $push: updateWorkDto,
      },
      { new: true },
    )
  }

  async addUser(userId: string, workId: string) {
    return this.workModel.findByIdAndUpdate(workId, { $set: { user: userId } }, { new: true })
  }

  async removeUser(userId: string, workId: string) {
    return this.workModel.findByIdAndUpdate(workId, { $pull: { user: userId } }, { new: true })
  }

  async getUsers(workId: string) {
    const assessment = await this.workModel.findById(workId).populate('user')
    return assessment
  }

  async remove(id: string) {
    return this.workModel.deleteOne({ id }).exec()
  }
}
