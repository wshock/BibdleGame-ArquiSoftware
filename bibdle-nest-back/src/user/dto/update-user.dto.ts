import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UserRoles } from 'src/common/roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    description: 'Email address of the user',
    example: 'user@example.com',
  })
  readonly email: string;

  @ApiPropertyOptional({
    description: 'Name of the user',
    example: 'John Doe',
  })
  readonly name: string;

  @ApiPropertyOptional({
    description: 'Password of the user',
    example: 'strongPassword123',
  })
  readonly password: string;

  @ApiPropertyOptional({
    description: 'Role of the user',
    example: 'ADMIN',
    enum: UserRoles,
  })
  readonly role: UserRoles;
}
