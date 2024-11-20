import { Department } from '../entity/depts.entity';
import { CreateDeptResponse } from './depts.dto';

export function mapDeptToDeptDto(dept: Department): CreateDeptResponse {
  return {
    id: dept.id,
    name: dept.name,
    parentDeptId: dept.parentDept?.id,
    parentOrgId: dept.organisation.id,
  };
}
