import { DataSource } from 'typeorm';

import databaseConfig from '@config/ormconfig';

export const dataSource = new DataSource(databaseConfig);
