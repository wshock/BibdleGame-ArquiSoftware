import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { Role } from 'generated/prisma/enums';
import { CompareCharacterDto } from './dto/compare-character.dto';

@Controller('characters')
export class CharacterController {
  constructor(private characterService: CharacterService) {}

  @Post('character-of-the-day')
  compareCharacter(@Body() characterOfPlayer: CompareCharacterDto) {
    return this.characterService.compareCharacter(characterOfPlayer);
  }
}
