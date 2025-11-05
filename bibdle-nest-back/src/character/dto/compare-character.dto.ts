import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CompareCharacterDto {
  @ApiProperty({ example: 'Masculino' })
  @IsString()
  gender: string;

  @ApiProperty({ example: 'Antiguo Testamento' })
  @IsString()
  time: string;

  @ApiProperty({ example: ['Profeta/Profetisa'] })
  @IsArray()
  @IsString({ each: true })
  role: string[];
}
