import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Address } from '../../entities/address.entity'
import { User } from '../../entities/user.entity'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: process.env.PG_DATABASE || 'restaurant-deveop',
  entities: [User, Address],
  migrations: ['src/config/database/migrations/*{.ts,.js}'],
  synchronize: false,
  logging: true,
}
