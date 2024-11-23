import { Module } from '@nestjs/common';

import { DevTestingController } from './controller/devTesting.controller';

@Module({
  controllers: [DevTestingController],
})
export class DevTestingModule {}
