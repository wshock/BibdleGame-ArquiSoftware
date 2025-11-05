import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CharacterController],
  providers: [CharacterService, PrismaService, UserService],
})
export class CharacterModule {}
