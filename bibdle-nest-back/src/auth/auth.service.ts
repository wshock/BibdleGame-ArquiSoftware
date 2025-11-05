import { HttpException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const user = await this.prisma.user.findFirst({
      where: { email: loginDto.email },
    });

    if (!user) {
      return null;
    }

    if (!user.password) {
      return null;
    }
    const match = bcrypt.compareSync(loginDto.password, user.password);

    if (!match) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;

    return result;
  }

  async login(email: string, userid: number, role: string) {
    const payload = { email, sub: userid, role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(registerDto: RegisterDto) {
    try {
      const hashedPassword = await hashPassword(registerDto.password);
      const user = await this.prisma.user.create({
        data: {
          email: registerDto.email,
          password: hashedPassword,
          name: registerDto.names,
        },
      });
      const payload = { email: user.email, sub: user.id, role: user.role };

      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch {
      throw new HttpException('Error registering user', 500);
    }
  }
}
