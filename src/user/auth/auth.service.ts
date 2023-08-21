import {
  ConflictException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

interface createUser {
  name: string;
  email: string;
  password: string;
  location: string;
}

interface loginUser {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signUp(
    { name, email, password, location }: createUser,
    usertype: UserType,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new ConflictException();
    }

    const hashPassword = await bcrypt.hash(password, 16);

    const newUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        location,
        usertype,
      },
    });

    return new HttpException('Register Success', 200);
  }

  async signIn({ email, password }: loginUser, usertype: UserType) {
    const validEmail = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!validEmail) {
      throw new UnauthorizedException('Invalid Email');
    }

    const hashPassword = validEmail.password;

    const validPassword = await bcrypt.compare(password, hashPassword);

    if (!validPassword) {
      throw new UnauthorizedException('Invalid Password');
    }

    if (validEmail.usertype !== usertype) {
      throw new UnauthorizedException();
    }

    return this.generatedToken(validEmail.id, validEmail.email);
  }

  private generatedToken(id, email) {
    return jwt.sign(
      {
        id,
        email,
      },
      process.env.JSON_KEY,
      {
        expiresIn: 3600,
      },
    );
  }

  async generatedProductKey(email: string, usertype: UserType) {
    const string = `${email}-${usertype}-${process.env.PRODUCT_KEY}`;

    return bcrypt.hash(string, 10);
  }
}
