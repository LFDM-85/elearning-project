import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class CreateAttendanceDto {
  @ApiProperty({
    example: 'true',
    description: 'Is the state of the presence of the student in the lecture.',
  })
  @IsBoolean()
  @IsOptional()
  attendance: boolean
  @ApiProperty({
    example: 'false',
    description:
      'Is the validation state of the presence of the student in the lecture. It is given by the teacher.',
  })
  @IsBoolean()
  @IsOptional()
  validation: boolean
  @ApiProperty({
    example: 'filenameExample',
    description: 'The name that the user gives to the file that will be uploaded',
  })
  @IsString()
  @IsOptional()
  filename: string
  @ApiProperty({
    example: '/parentfolder/filenameExample',
    description: 'Is the location of the file that the user will upload',
  })
  @IsString()
  @IsOptional()
  filepath: string
  @ApiProperty({
    example: 'johnDoe@xyz.com',
    description: 'Is the user email that will be associated to the file. Is the owner of the file',
  })
  @IsString()
  @IsOptional()
  owner: string
}
