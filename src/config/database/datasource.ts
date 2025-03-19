import { DataSource } from 'typeorm';

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "root",
  password: "root",
  database: process.env.PG_DATABASE || "restaurant-develop",
  entities: ["src/entities/*.entity.ts"],
  migrations: ["src/config/database/migrations/*.ts"],
  migrationsTableName: "custom_migration_table",
})