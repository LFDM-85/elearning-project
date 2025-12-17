import { ApiProperty } from '@nestjs/swagger'

export class AuthDto {
  @ApiProperty({
    example: 'JonhDoe@xyz.com',
    description: 'Is the user email to login.',
  })
  email: string

  @ApiProperty({
    example: 'agfgagfg8906d7ftANzvv',
    description: 'Is the user password.',
  })
  password: string
}
