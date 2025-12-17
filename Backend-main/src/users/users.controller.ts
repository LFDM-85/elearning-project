import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll() {
    console.log('GET /users endpoint hit. Attempting to find all users...');
    return this.usersService.findAll()
  }

  
  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email)
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id)
  }

  @Patch('/:id/add-course/:courseId')
  addCourse(@Param('id') userId: string, @Param('courseId') courseId: string) {
    return this.usersService.addCourse(userId, courseId)
  }

  @Patch('/:id/remove-course/:courseId')
  removeCourse(@Param('id') userId: string, @Param('courseId') courseId: string) {
    return this.usersService.removeCourse(userId, courseId)
  }

  @Get('/:email/courses')
  getCourses(@Param('email') email: string) {
    return this.usersService.getCourses(email)
  }

  @Patch('/:id/add-work/:workId')
  addWork(@Param('id') userId: string, @Param('workId') workId: string) {
    return this.usersService.addWork(userId, workId)
  }

  @Patch('/:id/remove-work/:workId')
  removeWork(@Param('id') userId: string, @Param('workId') workId: string) {
    return this.usersService.removeWork(userId, workId)
  }

  @Get('/:id/works')
  getWork(@Param('id') userId: string) {
    return this.usersService.getWork(userId)
  }

  @Patch('/:id/add-assessment/:assessmentId')
  addAssessment(@Param('id') userId: string, @Param('assessmentId') assessmentId: string) {
    return this.usersService.addAssessment(userId, assessmentId)
  }

  @Patch('/:id/remove-work/:assessmentId')
  removeAssessment(@Param('id') userId: string, @Param('assessmentId') assessmentId: string) {
    return this.usersService.removeAssessment(userId, assessmentId)
  }

  @Get('/:email/assessments')
  getAssessment(@Param('email') userEmail: string) {
    return this.usersService.getAssessment(userEmail)
  }

  @Patch('/:id/add-attendance/:attendanceId')
  addAttendance(@Param('id') userId: string, @Param('attendanceId') attendanceId: string) {
    return this.usersService.addAttendance(userId, attendanceId)
  }

  @Patch('/:id/remove-attendance/:attendanceId')
  removeAttendance(@Param('id') userId: string, @Param('attendanceId') attendanceId: string) {
    return this.usersService.removeAttendance(userId, attendanceId)
  }

  @Get('/:id/attendances')
  getAttendance(@Param('id') userId: string) {
    return this.usersService.getAttendance(userId)
  }
}
