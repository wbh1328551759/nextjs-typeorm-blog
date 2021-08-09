import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateComments1628519845761 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'comments',
      columns: [
        {name: 'id', type: 'int', isGenerated: true, isPrimary: true, generationStrategy: 'increment'},
        {name: 'user_id', type: 'int'},
        {name: 'post_id', type: 'int'},
        {name: 'content', type: 'text'}
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('comments')
  }

}
