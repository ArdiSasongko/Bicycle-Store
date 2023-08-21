import { Module } from '@nestjs/common';
import { BicycleService } from './bicycle.service';
import { BicycleController } from './bicycle.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [BicycleService],
  controllers: [BicycleController],
})
export class BicycleModule {}
