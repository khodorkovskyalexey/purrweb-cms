import {MigrationInterface, QueryRunner} from "typeorm";

export class RenameUserSubIdColumn1641322089169 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" RENAME "sub_id" TO "sub"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" RENAME "sub" TO "sub_id"');
    }

}
