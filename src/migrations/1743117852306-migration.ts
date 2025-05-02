import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1743117852306 implements MigrationInterface {
  name = 'Migration1743117852306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL`,
    );
  }
}
