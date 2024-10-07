import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Need to import this before any module in which we need to use .env variables
  ],
})
export class NestConfigModule {}
