import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateFilesTable1640291168812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE file (id SERIAL PRIMARY KEY, extension VARCHAR, url VARCHAR)');
        await queryRunner.query('CREATE TABLE file_in_content (id SERIAL PRIMARY KEY, fileId INT, contentId INT, CONSTRAINT file_fk FOREIGN KEY (fileId) REFERENCES file(id), CONSTRAINT content_fk FOREIGN KEY (contentId) REFERENCES content(id))');
        await queryRunner.query('ALTER TABLE content DROP COLUMN extension');
        await queryRunner.query('ALTER TABLE content DROP COLUMN url');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE file_in_content DROP CONSTRAINT file_fk');
        await queryRunner.query('ALTER TABLE file_in_content DROP CONSTRAINT content_fk');
        await queryRunner.query('DROP TABLE file_in_content');
        await queryRunner.query('DROP TABLE file');
        await queryRunner.query('ALTER TABLE content ADD COLUMN extension VARCHAR');
        await queryRunner.query('ALTER TABLE content ADD COLUMN url VARCHAR');
    }

}
