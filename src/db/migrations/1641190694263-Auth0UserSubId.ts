import {MigrationInterface, QueryRunner} from "typeorm";

export class Auth0UserSubId1641190694263 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" ADD COLUMN sub_id VARCHAR UNIQUE');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN sub_id');
    }

}
