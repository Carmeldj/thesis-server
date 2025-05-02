import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1746125824359 implements MigrationInterface {
  name = 'Migration1746125824359';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
  }
}
