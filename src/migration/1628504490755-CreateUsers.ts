import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1628504490755 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {name: 'id', type: 'int', isGenerated: true, isPrimary: true, generationStrategy: 'increment'},
        {name: 'name', type: 'varchar'},
        {name: 'password_digest', type: 'varchar'},
      ]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }

}
