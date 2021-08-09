import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePosts1628526245469 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'posts',
      columns: [
        {name: 'id', type: 'int', isGenerated: true, isPrimary: true, generationStrategy: 'increment'},
        {name: 'title', type: 'varchar'},
        {name: 'content', type: 'text'},
        {name: 'author_id', type: 'int'}
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropTable('posts');

    }catch (e){}

  }

}
