import {
  Controller,
  Post,
  Body,
  Param,
  ParseEnumPipe,
  HttpException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  createUserDto,
  generatedTokenDto,
  loginUserDto,
} from './dtos/auth.dto';
import { UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('auth/:usertype')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('SignUp')
  async signUp(
    @Body() body: createUserDto,
    @Param('usertype', new ParseEnumPipe(UserType)) usertype: UserType,
  ) {
    if (usertype === UserType.ADMIN) {
      if (!body.product_key) {
        throw new HttpException('Need Product Key', 400);
      }

      const validProductKey = `${body.email}-${usertype}-${process.env.PRODUCT_KEY}`;

      const isValidProductKey = await bcrypt.compare(
        validProductKey,
        body.product_key,
      );

      if (!isValidProductKey) {
        throw new HttpException('Invalid Product Key', 400);
      }
    }
    return this.authService.signUp(body, usertype);
  }

  @Post('SignIn')
  signIn(
    @Body() body: loginUserDto,
    @Param('usertype', new ParseEnumPipe(UserType)) usertype: UserType,
  ) {
    return this.authService.signIn(body, usertype);
  }

  @Roles(UserType.ADMIN)
  @Post('productKey')
  productKey(@Body() { email, usertype }: generatedTokenDto) {
    return this.authService.generatedProductKey(email, usertype);
  }
}
