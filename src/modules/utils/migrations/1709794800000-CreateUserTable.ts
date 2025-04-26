import { MigrationInterface, QueryRunner } from 'typeorm'

export default class CreateUserTable1709794800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "util_record" (
        "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
        "userId" integer NOT NULL,
        "groupId" integer NOT NULL,
        "commandName" varchar NOT NULL,
        "usedAt" datetime NOT NULL DEFAULT (datetime('now'))
      )
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "util_record"`)
  }
} 