import { Organization } from '../entities/orgs.entity';
import { OrgDto } from './orgs.dto';

export function mapOrgToOrgDto(org: Organization): OrgDto {
  return {
    id: org.id,
    name: org.name,
  };
}
