import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1743117495094 implements MigrationInterface {
  name = 'Migration1743117495094';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "email" character varying NOT NULL, "image" character varying NOT NULL, "role" character varying NOT NULL, "is_verified" boolean NOT NULL DEFAULT false, "phoneNumber" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
