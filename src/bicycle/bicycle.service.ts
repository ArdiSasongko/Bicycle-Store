import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CATEGORY, MERK } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseBicycleDto } from './dtos/bicycle.dto';

interface Bicycles {
  price: {
    lte?: number;
    gte?: number;
  };
  merk?: MERK;
  categoty?: CATEGORY;
  name?: string;
}

interface addBicycle {
  merk: MERK;
  category: CATEGORY;
  name: string;
  price: number;
  amount: number;
}

interface editBicycle {
  merk?: MERK;
  category?: CATEGORY;
  name?: string;
  price?: number;
  amount?: number;
}

interface buyBicycle {
  amount: number;
  price: number;
}

const bicycleSelect = {
  id: true,
  merk: true,
  category: true,
  name: true,
};

@Injectable()
export class BicycleService {
  constructor(private readonly prismaService: PrismaService) {}

  async getBicycles(filter: Bicycles): Promise<ResponseBicycleDto[]> {
    const bicycles = await this.prismaService.bicycle.findMany({
      select: {
        ...bicycleSelect,
      },
      where: filter,
    });

    if (!bicycles.length) {
      throw new NotFoundException();
    }

    return bicycles.map((bicycles) => {
      const fetchBicycles = { ...bicycles };
      return new ResponseBicycleDto(fetchBicycles);
    });
  }

  async getBicycle(id: number) {
    const bicycle = await this.prismaService.bicycle.findUnique({
      select: {
        ...bicycleSelect,
        price: true,
        amount: true,
      },
      where: {
        id: id,
      },
    });

    if (!bicycle) {
      throw new NotFoundException();
    }

    return new ResponseBicycleDto(bicycle);
  }

  async addBicycle({ merk, category, name, price, amount }: addBicycle) {
    const findBicycle = await this.prismaService.bicycle.findUnique({
      where: {
        name,
      },
    });

    if (findBicycle) {
      throw new ConflictException();
    }

    const newBicycle = await this.prismaService.bicycle.create({
      data: {
        merk,
        category,
        name,
        price,
        amount,
      },
    });

    return new HttpException(newBicycle, 201);
  }

  async editBicycle(id: number, data: editBicycle) {
    const findBicycle = await this.prismaService.bicycle.findUnique({
      where: {
        id,
      },
    });

    if (!findBicycle) {
      throw new NotFoundException();
    }

    const updatedBicycle = await this.prismaService.bicycle.update({
      where: {
        id,
      },
      data,
    });

    return new HttpException(updatedBicycle, 200);
  }

  async deleteBicyle(id: number) {
    const findBicycle = await this.prismaService.bicycle.findUnique({
      where: {
        id,
      },
    });

    if (!findBicycle) {
      throw new NotFoundException();
    }

    const deleteBicyle = await this.prismaService.bicycle.delete({
      where: {
        id,
      },
    });

    return new HttpException(`Success Deleted ${findBicycle.name}`, 204);
  }

  async buyBicycle({ amount, price }: buyBicycle, user_id: number, id: number) {
    const bicycle = await this.prismaService.bicycle.findUnique({
      where: {
        id,
      },
    });

    if (!bicycle) {
      throw new NotFoundException();
    }

    if (amount > bicycle.amount) {
      throw new HttpException(
        `goods out of stock, remaining stock ${bicycle.amount}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const total_price = bicycle.price * amount;

    if (price < total_price) {
      throw new HttpException(
        `Money not enough, total ${total_price}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const newAmount = bicycle.amount - amount;

    const newBicycle = await this.prismaService.bicycle.update({
      where: {
        id,
      },
      data: { amount: newAmount },
    });

    const newBuyer = await this.prismaService.history.create({
      data: {
        id_user: user_id,
        id_bicycle: id,
        amount: amount,
        total_price: total_price,
      },
    });

    throw new HttpException(`Success Buy ${bicycle.name}`, 201);
  }
}
