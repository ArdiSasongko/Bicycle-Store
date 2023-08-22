import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { BicycleModule } from './bicycle/bicycle.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from './guard/auth.guard';
import { DataInterceptor } from './interceptor/data.inteceptor';

@Module({
  imports: [PrismaModule, UserModule, BicycleModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataInterceptor,
    },
  ],
})
export class AppModule {}
