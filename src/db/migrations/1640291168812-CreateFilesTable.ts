import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFilesTable1640291168812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE file (id SERIAL PRIMARY KEY, extension VARCHAR, url VARCHAR, contentId INT, CONSTRAINT content_fk FOREIGN KEY (contentId) REFERENCES content(id))');
        await queryRunner.query('ALTER TABLE content DROP COLUMN extension, DROP COLUMN url');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE file DROP CONSTRAINT content_fk');
        await queryRunner.query('DROP TABLE file');
        await queryRunner.query('ALTER TABLE content ADD COLUMN extension VARCHAR, ADD COLUMN url VARCHAR');
    }

}
