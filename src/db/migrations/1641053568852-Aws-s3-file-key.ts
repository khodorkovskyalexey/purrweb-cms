import {MigrationInterface, QueryRunner} from "typeorm";

export class AwsS3FileKey1641053568852 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE file ADD COLUMN key VARCHAR');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE file DROP COLUMN key');
    }

}
