import { CATEGORY, MERK } from '@prisma/client';
import { Exclude } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class ResponseBicycleDto {
  id: number;
  merk: MERK;
  category: CATEGORY;
  name: string;
  price: number;

  @Exclude()
  amount: number;

  constructor(partial: Partial<ResponseBicycleDto>) {
    Object.assign(this, partial);
  }
}

export class addBicycleDto {
  @IsEnum(MERK)
  merk: MERK;

  @IsEnum(CATEGORY)
  category: CATEGORY;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  amount: number;
}

export class editBicyleDto {
  @IsOptional()
  @IsEnum(MERK)
  merk: MERK;

  @IsOptional()
  @IsEnum(CATEGORY)
  category: CATEGORY;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;
}

export class buyBicycleDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}
