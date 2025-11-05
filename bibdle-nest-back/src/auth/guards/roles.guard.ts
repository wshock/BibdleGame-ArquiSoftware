import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { Role } from 'generated/prisma/enums';
import { ROLES_KEY } from '../roles.decorator';

@Injectable()
export class RolesGuard extends JwtAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: { email: string } = request.user;

    const dbUser = await this.userService.findOne(user.email);

    if (!dbUser) {
      return false;
    }

    const roleHierarchy: Record<Role, Role[]> = {
      // Roles Pastorales
      [Role.USER]: [Role.USER],
      [Role.ADMIN]: [Role.ADMIN],

      // Roles Administrativos
    };

    // Verificar si el rol real del usuario está dentro del grupo permitido
    const allowed = requiredRoles.some((requiredRole) => {
      const validRoles = roleHierarchy[requiredRole] || [requiredRole];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return validRoles.includes(dbUser.role);
    });

    return allowed;
  }
}
