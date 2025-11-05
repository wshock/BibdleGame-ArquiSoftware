import { HttpException, Injectable } from '@nestjs/common';
import { Prisma, Role } from 'generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { hashPassword } from 'src/utils/bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from 'src/common/pagination.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findOne(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async find(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = page && limit ? (page - 1) * limit : undefined;
    const take = limit || undefined;
    return this.prisma.user.findMany({
      where: {
        role: Role.USER,
      },
      omit: {
        password: true,
        role: true,
      },
      skip,
      take,
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.findOne(createUserDto.email);
    if (user) {
      throw new HttpException('Email already exists', 400);
    }

    const password = await hashPassword(createUserDto.password);
    return this.prisma.user.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password,
        role: createUserDto.role,
      },
    });
  }
  async update(updateUserDto: UpdateUserDto, id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (user.role === 'ADMIN') {
      throw new HttpException('Unable to modify Admins', 400);
    }
    try {
      let password: string | undefined;
      if (updateUserDto.password) {
        password = await hashPassword(updateUserDto.password);
      }
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          email: updateUserDto.email,
          name: updateUserDto.name,
          password,
          role: updateUserDto.role,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException('Email already exists', 400);
      }
      throw new HttpException('Server error', 500);
    }
  }
  async delete(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (user.role !== 'USER') {
      throw new HttpException('Unable to delete user', 400);
    }
    try {
      await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return { message: `Successfully deleted user with id ${id}` };
    } catch {
      throw new HttpException('Server error', 500);
    }
  }
}
