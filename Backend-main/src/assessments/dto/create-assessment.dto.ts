import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateAssessmentDto {
  @ApiProperty({
    example: '17',
    description: 'Is the value of the assessmente for the user in a specific lecture.',
  })
  @IsNumber()
  @IsNotEmpty()
  assessmentValue: number
  @ApiProperty({
    example: 'johnDoe@xyz.com',
    description: 'Is the user email that will be associated to the assessment.',
  })
  @IsString()
  @IsNotEmpty()
  userEmail: string
}
