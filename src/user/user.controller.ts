import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/common/decorators';
import { User } from '@prisma/client';
import { AtGuard, RoleGuard } from 'src/common/guards';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(AtGuard)
  findOne(@GetUser() user: User) {
    return user;
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AtGuard, RoleGuard)
  findAll() {
    return this.userService.findAll();
  }
}
