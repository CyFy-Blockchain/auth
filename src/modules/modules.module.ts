import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { ServerHealthCheckModule } from '@baseModules/server-health-check/server-health-check.module';
import { UsersModule } from '@baseModules/users/users.module';
import { DeptModule } from './departments/depts.module';
import { OrgModule } from './organisations/orgs.module';

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
    ...getModuleWithPath('server-health-check', ServerHealthCheckModule),
    ...getModuleWithPath('users', UsersModule),
    ...getModuleWithPath('departments', DeptModule),
    ...getModuleWithPath('organisations', OrgModule),
  ],
})
export class ControllerModule {}
