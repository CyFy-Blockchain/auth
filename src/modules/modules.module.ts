import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { OrgsModule } from './orgs/orgs.module';
import { UsersModule } from './users/users.module';

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
    ...getModuleWithPath('users', UsersModule),
    ...getModuleWithPath('organizations', OrgsModule),
  ],
})
export class ControllerModule {}
