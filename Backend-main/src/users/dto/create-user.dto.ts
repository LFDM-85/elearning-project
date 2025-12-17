import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({
    example: 'John Doe',
    description:
      'The name will be used for anything (Profile, Home Page, etc.) that needs to display information about the connected person.',
  })
  name: string

  @ApiProperty({
    example: 'image.jpg',
    description: 'User-associated avatar image',
  })
  image?: string

  @ApiProperty({
    example: 'email@email.com',
    description: 'The email that was used for account registration. Also required to login',
  })
  email: string
  @ApiProperty({
    example: 'dfg089uoHUHhpuhT',
    description: 'The password that was used for account registration. Also required to login',
  })
  password: string

  refreshToken?: string
  @ApiProperty({
    example: "['student']",
    description:
      'The roles are assigned to the user and with them he will have access to specific information',
  })
  roles: string[]
  @ApiProperty({
    example: 'true',
    description:
      'Validation allows the teacher to log into the account and have access to all contents',
  })
  isValidated: boolean
}
