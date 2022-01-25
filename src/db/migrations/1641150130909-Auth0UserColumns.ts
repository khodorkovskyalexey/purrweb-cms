import {MigrationInterface, QueryRunner} from "typeorm";

export class Auth0UserColumns1641150130909 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN password');
        await queryRunner.query('ALTER TABLE "user" ADD COLUMN email_verified BOOLEAN, ADD COLUMN picture VARCHAR, ADD COLUMN name VARCHAR, ADD COLUMN nickname VARCHAR');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "user" DROP COLUMN email_verified, DROP COLUMN picture, DROP COLUMN name, DROP COLUMN nickname');
        await queryRunner.query('ALTER TABLE "user" ADD COLUMN password VARCHAR');
    }

}
