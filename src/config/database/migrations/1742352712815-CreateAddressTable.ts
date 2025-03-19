import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateAddressTable1742352712815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE addresses (
              id SERIAL PRIMARY KEY,
              street VARCHAR(255) NOT NULL,
              city VARCHAR(100) NOT NULL,
              state VARCHAR(100) NOT NULL,
              postalCode VARCHAR(20) NOT NULL,
              userId INT,
              CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
            );
          `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE IF EXISTS addresses;
          `)
  }
}
