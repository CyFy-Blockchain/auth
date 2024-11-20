import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { OrgsModule } from './orgs/orgs.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { ContractModule } from './contracts/contracts.module';
import { DeptModule } from './depts/depts.module';

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
    ...getModuleWithPath('admins', AdminModule),
    ...getModuleWithPath('departments', DeptModule),
    ...getModuleWithPath('contracts', ContractModule),
  ],
})
export class ControllerModule {}
