import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { BicycleService } from './bicycle.service';
import { CATEGORY, MERK, UserType } from '@prisma/client';
import {
  ResponseBicycleDto,
  addBicycleDto,
  buyBicycleDto,
  editBicyleDto,
} from './dtos/bicycle.dto';
import { User, userInfo } from 'src/decorator/user.decorator';
import { Roles } from 'src/decorator/roles.decorator';

@Controller('bicycle')
export class BicycleController {
  constructor(private readonly bicycleService: BicycleService) {}

  @Get()
  getBicycles(
    @Query('categoty') category?: CATEGORY,
    @Query('merk') merk?: MERK,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('name') name?: string,
  ): Promise<ResponseBicycleDto[]> {
    const price =
      minPrice || maxPrice
        ? {
            ...(minPrice && { lte: parseFloat(minPrice) }),
            ...(maxPrice && { gte: parseFloat(maxPrice) }),
          }
        : undefined;

    const filter = {
      ...(price && { price }),
      ...(merk && { merk }),
      ...(category && { category }),
      ...(name && { name }),
    };

    return this.bicycleService.getBicycles(filter);
  }

  @Get(':id')
  getBicycle(@Param('id') id: number) {
    return this.bicycleService.getBicycle(id);
  }

  @Roles(UserType.ADMIN)
  @Post()
  addBicycle(@Body() body: addBicycleDto) {
    return this.bicycleService.addBicycle(body);
  }

  @Roles(UserType.ADMIN)
  @Put(':id')
  editBicycle(@Body() body: editBicyleDto, @Param('id') id: number) {
    return this.bicycleService.editBicycle(id, body);
  }

  @Roles(UserType.ADMIN)
  @Delete(':id')
  deleteBicycle(@Param('id') id: number) {
    return this.bicycleService.deleteBicyle(id);
  }

  @Roles(UserType.ADMIN, UserType.BUYER)
  @Post(':id/buy')
  buyBicycle(
    @Body() body: buyBicycleDto,
    @User() user: userInfo,
    @Param('id') id: number,
  ) {
    return this.bicycleService.buyBicycle(body, user.id, id);
  }
}
