import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
  HttpStatus,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import path, { join } from 'path'
import { AttendanceService } from './attendance.service'
import { CreateAttendanceDto } from './dto/create-attendance.dto'
import { UpdateAttendanceDto } from './dto/update-attendance.dto'
import { Roles } from '../decorators/roles.decorator'
import { Role } from '../enums/role.enum'
import { ApiTags } from '@nestjs/swagger'

// const storage = {
//     storage: diskStorage({
//       destination: 'uploads/attendance',
//       filename: (req, file, cb) => {
//         const filename = (file.originalname).replace(/\s/g, '');

//         cb(null, filename);

//        }
//     })
//   }

@ApiTags('Attendance')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/create')
  // @Roles(Role.Professor)
  create(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.create(createAttendanceDto)
  }

  // @Post('/uploadFile')
  // @UseInterceptors(FileInterceptor('file', storage))
  // uploadFile(@Res() res, @UploadedFile() file, @Body() createAttendanceDto: CreateAttendanceDto) {
  //   this.attendanceService.create({...createAttendanceDto, filename: file.filename})
  //   return res.status(HttpStatus.OK).json({
  //     success: true,
  //     data: file.path
  //   })
  //   }

  @Get('/download/:filename')
  findFile(@Param('filename') filename, @Res() res) {
    return res.sendFile(join(process.cwd(), 'uploads/attendance/' + filename))
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll()
  }

  @Patch(':id')
  // @Roles(Role.Student)
  update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
    return this.attendanceService.update(id, updateAttendanceDto)
  }

  @Patch('/:id/add-user/:attendanceId')
  //  @Roles(Role.Student)
  addAttendance(@Param('id') userId: string, @Param('attendanceId') attendanceId: string) {
    return this.attendanceService.addUser(userId, attendanceId)
  }

  @Patch('/:id/remove-user/:attendanceId')
  //  @Roles(Role.Student)
  removeAttendance(@Param('id') userId: string, @Param('attendanceId') attendanceId: string) {
    return this.attendanceService.removeUser(userId, attendanceId)
  }

  // @Get('/:attendanceId/users')

  getAttendance(@Param('attendanceId') attendanceId: string) {
    return this.attendanceService.getUsers(attendanceId)
  }

  @Delete(':id')
  // @Roles(Role.Student)
  remove(@Param('id') id: string) {
    return this.attendanceService.remove(id)
  }
}
