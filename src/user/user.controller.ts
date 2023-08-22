import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { Roles } from 'src/decorator/roles.decorator';
import { UserType } from '@prisma/client';
import { User, userInfo } from 'src/decorator/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserType.ADMIN, UserType.BUYER)
  @Get('History')
  getHistory(@User() user: userInfo) {
    return this.userService.getHistory(user.id);
  }
}
