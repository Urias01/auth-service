import 'tsconfig-paths/register';
import { Address } from '@entities/address.entity'
import { User } from '@entities/user.entity'
import { DataSource } from 'typeorm'

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: process.env.PG_DATABASE || 'restaurant-develop',
  entities: [User, Address],
  migrations: ['src/config/database/migrations/*.ts'],
  migrationsTableName: 'custom_migration_table',
})
