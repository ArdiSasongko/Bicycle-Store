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
import { CATEGORY, MERK } from '@prisma/client';
import {
  ResponseBicycleDto,
  addBicycleDto,
  editBicyleDto,
} from './dtos/bicycle.dto';

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

  @Post()
  addBicycle(@Body() body: addBicycleDto) {
    return this.bicycleService.addBicycle(body);
  }

  @Put(':id')
  editBicycle(@Body() body: editBicyleDto, @Param('id') id: number) {
    return this.bicycleService.editBicycle(id, body);
  }

  @Delete(':id')
  deleteBicycle(@Param('id') id: number) {
    return this.bicycleService.deleteBicyle(id);
  }
}
