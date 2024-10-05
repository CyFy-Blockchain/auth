import { Module } from '@nestjs/common';

import { AppConfigModule } from '@config/app.config.module';
import { ControllerModule } from '@baseModules/modules.module';

@Module({
  imports: [AppConfigModule, ControllerModule],
})
export class AppModule {}
