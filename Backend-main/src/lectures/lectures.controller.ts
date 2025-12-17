import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { LecturesService } from './lectures.service'
import { CreateLectureDto } from './dto/create-lecture.dto'
import { UpdateLectureDto } from './dto/update-lecture.dto'
import { Roles } from '../decorators/roles.decorator'
import { Role } from '../enums/role.enum'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Lectures')
@Controller('lectures')
export class LecturesController {
  constructor(private readonly lecturesService: LecturesService) {}

  @Post('/create')
  // @Roles(Role.Professor)
  create(@Body() createLectureDto: CreateLectureDto) {
    return this.lecturesService.create(createLectureDto)
  }

  @Get('/all')
  findAll() {
    return this.lecturesService.findAll()
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.lecturesService.findOne(id);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lecturesService.findOne(id)
  }

  @Patch('/:id')
  // @Roles(Role.Professor)
  update(@Param('id') id: string, @Body() updateLectureDto: UpdateLectureDto) {
    return this.lecturesService.update(id, updateLectureDto)
  }

  @Patch('/:assessmentId/add-assessment/:lectureId')
  // @Roles(Role.Professor)
  addAssessment(
    @Param('assessmentId') assessmentId: string,
    @Param('lectureId') lectureId: string,
  ) {
    return this.lecturesService.addAssessment(assessmentId, lectureId)
  }

  @Patch('/:assessmentId/remove-assessment/:lectureId')
  //  @Roles(Role.Professor)
  removeAssessment(
    @Param('assessmentId') assessmentId: string,
    @Param('lectureId') lectureId: string,
  ) {
    return this.lecturesService.removeAssessment(assessmentId, lectureId)
  }

  @Get('/:lectureId/assessments')
  getAssessment(@Param('lectureId') lectureId: string) {
    return this.lecturesService.getAssessment(lectureId)
  }

  @Patch('/:attendanceId/add-attendance/:lectureId')
  // @Roles(Role.Professor)632df5c659a0375a46a65527
  // @Roles(Role.Student)
  addAttendance(
    @Param('attendanceId') attendanceId: string,
    @Param('lectureId') lectureId: string,
  ) {
    return this.lecturesService.addAttendance(attendanceId, lectureId)
  }

  @Patch('/:attendanceId/remove-attendance/:lectureId')
  //  @Roles(Role.Professor)
  // @Roles(Role.Student)
  removeAttendance(
    @Param('attendanceId') attendanceId: string,
    @Param('lectureId') lectureId: string,
  ) {
    return this.lecturesService.removeAttendance(attendanceId, lectureId)
  }

  @Get('/:classId/attendances')
  getAttendance(@Param('lectureId') lectureId: string) {
    return this.lecturesService.getAttendance(lectureId)
  }

  @Patch('/:workId/add-work/:lectureId')
  // @Roles(Role.Professor)
  // @Roles(Role.Student)
  addWork(@Param('workId') workId: string, @Param('lectureId') lectureId: string) {
    return this.lecturesService.addWork(workId, lectureId)
  }

  @Patch('/:workId/remove-work/:lectureId')
  //  @Roles(Role.Professor)
  // @Roles(Role.Student)
  removeWork(@Param('workId') workId: string, @Param('lectureId') lectureId: string) {
    return this.lecturesService.removeWork(workId, lectureId)
  }

  @Get('/:lectureId/works')
  getWork(@Param('lectureId') lectureId: string) {
    return this.lecturesService.getWork(lectureId)
  }

  @Delete('/:id')
  // @Roles(Role.Professor)
  remove(@Param('id') id: string) {
    return this.lecturesService.remove(id)
  }
}
