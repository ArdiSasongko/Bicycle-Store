import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getHistory(id: number) {
    const history = await this.prismaService.history.findMany({
      select: {
        date: true,
        amount: true,
        total_price: true,
        bicycle: {
          select: {
            id: true,
            name: true,
            price: true,
            merk: true,
            category: true,
          },
        },
      },
      where: {
        id_user: id,
      },
    });

    if (!history.length) {
      throw new HttpException(
        'No transaction history found',
        HttpStatus.BAD_REQUEST,
      );
    }

    return history;
  }
}
