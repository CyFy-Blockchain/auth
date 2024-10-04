import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsersSetup1728007502076 implements MigrationInterface {
  name = 'UsersSetup1728007502076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("username" character varying NOT NULL, CONSTRAINT "PK_fe0bb3f6520ee0469504521e710" PRIMARY KEY ("username"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
