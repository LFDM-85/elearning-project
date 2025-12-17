import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { CourseService } from './course.service'
import { CreateCourseDto } from './dto/create-course.dto'
import { UpdateCourseDto } from './dto/update-course.dto'
import { Roles } from '../decorators/roles.decorator'
import { Role } from '../enums/role.enum'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Courses')
@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Post('/create')
  // @Roles(Role.Admin)
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto.nameCourse, createCourseDto.open)
  }

  @Get('/all')
  findAll() {
    return this.courseService.findAll()
  }

  @Get('/:name')
  findOne(@Param('name') name: string) {
    return this.courseService.findOne(name)
  }

  @Get('/:id')
  findId(@Param('id') id: string) {
    return this.courseService.findOne(id)
  }
  @Patch('/:id')
  // @Roles(Role.Admin)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto)
  }

  @Patch('/:id/add-user/:courseId')
  //  @Roles(Role.Admin)
  addCourse(@Param('id') userId: string, @Param('courseId') courseId: string) {
    return this.courseService.addUser(userId, courseId)
  }

  @Patch('/:id/remove-user/:courseId')
  //  @Roles(Role.Admin)
  removeCourse(@Param('id') userId: string, @Param('courseId') courseId: string) {
    return this.courseService.removeUser(userId, courseId)
  }

  @Get('/:courseId/users')
  getCourses(@Param('courseId') courseId: string) {
    return this.courseService.getUsers(courseId)
  }

  @Patch('/:lectureId/add-lecture/:courseId')
  // @Roles(Role.Professor)
  addLecture(@Param('lectureId') lectureId: string, @Param('courseId') courseId: string) {
    return this.courseService.addLecture(lectureId, courseId)
  }

  @Patch('/:lectureId/remove-lecture/:courseId')
  // @Roles(Role.Professor)
  removeLecture(@Param('lectureId') lectureId: string, @Param('courseId') courseId: string) {
    return this.courseService.removeLecture(lectureId, courseId)
  }

  @Get('/:courseId/lectures')
  getLectures(@Param('courseId') courseId: string) {
    return this.courseService.getLectures(courseId)
  }

  @Delete('/:name')
  //  @Roles(Role.Admin)
  remove(@Param('name') name: string) {
    return this.courseService.remove(name)
  }
}
