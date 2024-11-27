import {
  DynamicModule,
  ForwardReference,
  MiddlewareConsumer,
  Module,
  NestModule,
  Type,
} from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';

import { OrgsModule } from './orgs/orgs.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { ContractModule } from './contracts/contracts.module';
import { LoggerMiddleware } from '@app/middleware/logger/logger.middleware';
import { CronsModule } from './crons/crons.module';

type NestModuleType =
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference;

function getModuleWithPath(
  path: string,
  module: NestModuleType,
): Array<NestModuleType> {
  return [
    module,
    RouterModule.register([
      {
        path,
        module: module as Type<any>,
      },
    ]),
  ];
}

@Module({
  imports: [
    ScheduleModule.forRoot(),
    CronsModule,
    ...getModuleWithPath('users', UsersModule),
    ...getModuleWithPath('organizations', OrgsModule),
    ...getModuleWithPath('admins', AdminModule),
    ...getModuleWithPath('contracts', ContractModule),
  ],
})
export class ControllerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
