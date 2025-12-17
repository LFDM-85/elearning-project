import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateWorkDto {
  @ApiProperty({
    example: 'filenameExample',
    description: 'The name that the user gives to the file that will be uploaded',
  })
  @IsNotEmpty()
  @IsString()
  filename: string
  @ApiProperty({
    example: '/parentfolder/filenameExample',
    description: 'Is the location of the file that the user will upload',
  })
  @IsNotEmpty()
  @IsString()
  filepath: string
  @ApiProperty({
    example: 'johnDoe@xyz.com',
    description: 'Is the user email that will be associated to the file. Is the owner of the file',
  })
  @IsNotEmpty()
  @IsString()
  owner: string
}
