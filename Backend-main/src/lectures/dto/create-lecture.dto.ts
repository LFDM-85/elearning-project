import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateLectureDto {
  @ApiProperty({
    example: 'Lesson #1  - Lesson title',
    description: 'Is the title of the lesson',
  })
  @IsNotEmpty()
  @IsString()
  summary: string

  @ApiProperty({
    example: 'Users homeworks and discussion ',
    description: 'Is a brief discussion on the topic of the class.',
  })
  @IsNotEmpty()
  @IsString()
  description: string

  @ApiProperty({
    example: 'true',
    description: 'Sets the state of the lecture. If the teacher has finished the lecture or not.',
  })
  @IsBoolean()
  finished: boolean
}
