import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../common/decorators';
import { AtGuard, RtGuard } from '../common/guards';
import { Tokens } from './@types';
import { userPayload } from './@types/userPayload.types';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  localSignup(@Body() dto: AuthDTO): Promise<Tokens> {
    return this.authService.localSignup(dto);
  }

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  localSignin(@Body() dto: AuthDTO): Promise<Tokens> {
    return this.authService.localSignin(dto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AtGuard)
  logout(@GetUser('sub') userId: string) {
    return this.authService.logout(userId);
  }

  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  @UseGuards(RtGuard)
  refreshTokens(@GetUser() user: userPayload): Promise<Tokens> {
    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
