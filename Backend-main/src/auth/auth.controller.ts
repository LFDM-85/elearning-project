import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard'
import { RefreshTokenGuard } from 'src/common/guards/refreshToken.guard'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { Users } from 'src/users/schema/users.schema'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto)
  }

  @Post('/signin')
  signin(@Body() data: AuthDto) {
    return this.authService.signin(data)
  }

  @UseGuards(AccessTokenGuard)
  @Post('/signout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub'])
  }

  @UseGuards(RefreshTokenGuard)
  @Get('/refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub']
    const refreshToken = req.user['refreshToken']
    return this.authService.refreshTokens(userId, refreshToken)
  }

  @UseGuards(AccessTokenGuard)
  @Get('/whoami')
  whoami(@Req() req: Request) {
    return this.authService.whoami(req.user['sub'])
  }
}
