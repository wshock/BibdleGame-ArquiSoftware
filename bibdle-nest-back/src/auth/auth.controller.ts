import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login(@Req() req: Request, @Body() loginDto: LoginDto) {
    const user = req.user as { email: string; id: number; role: string };
    return this.authService.login(user.email, user.id, user.role);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('JWT-auth')
  // @Get('profile')
  // getProfile(@Req() req: Request) {
  //   return req.user;
  // }
}
