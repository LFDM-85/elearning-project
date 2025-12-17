import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { AssessmentsService } from './assessments.service'
import { CreateAssessmentDto } from './dto/create-assessment.dto'
import { UpdateAssessmentDto } from './dto/update-assessment.dto'
import { Roles } from '../decorators/roles.decorator'
import { Role } from '../enums/role.enum'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('Assessments')
@Controller('assessments')
export class AssessmentsController {
  constructor(private readonly assessmentsService: AssessmentsService) {}

  @Post('/create')
  // @Roles(Role.Professor)
  create(@Body() createAssessmentDto: CreateAssessmentDto) {
    return this.assessmentsService.create(createAssessmentDto)
  }

  @Get('/all')
  findAll() {
    return this.assessmentsService.findAll()
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.assessmentsService.findOne(+id);
  // }

  @Patch('/:id')
  // @Roles(Role.Professor)
  update(@Param('id') id: string, @Body() updateAssessmentDto: UpdateAssessmentDto) {
    return this.assessmentsService.update(id, updateAssessmentDto)
  }

  @Patch('/:id/add-user/:assessmentId')
  // @Roles(Role.Professor)
  addAssessment(@Param('id') userId: string, @Param('assessmentId') assessmentId: string) {
    return this.assessmentsService.addUser(userId, assessmentId)
  }

  @Patch('/:id/remove-user/:assessmentId')
  //  @Roles(Role.Professor)
  removeAssessment(@Param('id') userId: string, @Param('assessmentId') assessmentId: string) {
    return this.assessmentsService.removeUser(userId, assessmentId)
  }

  @Get('/:assessmentId/users')
  // @Roles(Role.Professor)
  getAssessment(@Param('assessmentId') assessmentId: string) {
    return this.assessmentsService.getUsers(assessmentId)
  }

  @Delete('/:id')
  // @Roles(Role.Professor)
  remove(@Param('id') id: string) {
    return this.assessmentsService.remove(id)
  }
}
