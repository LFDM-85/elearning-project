import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsString, IsNotEmpty, IsArray } from 'class-validator'

export class CreateCourseDto {
  @ApiProperty({
    example: 'Mathematics',
    description: 'Is the name of the course that was given by the administrator',
  })
  @IsNotEmpty()
  @IsString()
  nameCourse: string

  @ApiProperty({
    example: 'true',
    description: 'Is the state of the course.',
  })
  @IsNotEmpty()
  @IsBoolean()
  open: boolean
  @IsArray()
  lecture: [{}]
}
