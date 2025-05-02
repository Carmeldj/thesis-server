import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1746144475421 implements MigrationInterface {
    name = 'Migration1746144475421'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "live_stream" ("id" character varying NOT NULL, "userId" character varying NOT NULL, "members" text array, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9887ded06957b77acf962e5b77a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "live_stream"`);
    }

}
