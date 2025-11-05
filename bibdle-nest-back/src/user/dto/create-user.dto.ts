import { IsEmail, IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { UserRoles } from 'src/common/roles.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    description: 'Name of the user',
    example: 'John Doe',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: 'Password of the user',
    example: 'strongPassword123',
  })
  @IsString()
  readonly password: string;

  @ApiProperty({
    description: 'Role of the user',
    example: 'ADMIN',
    enum: UserRoles,
  })
  @IsEnum(UserRoles)
  @Transform(({ value }) => value.toUpperCase())
  readonly role: UserRoles;
}
