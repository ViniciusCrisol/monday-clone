import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateActivitiesTable1624116306392 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'activities',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'group_id',
            type: 'uuid',
          },
          {
            name: 'activity_name',
            type: 'varchar',
            length: '30',
          },
          {
            name: 'estimated_hours_spent',
            type: 'smallint',
            default: 0,
          },
          {
            name: 'hours_spent',
            type: 'smallint',
            default: 0,
          },
          {
            name: 'estimated_finish_date',
            type: 'smallint',
            default: 0,
          },
          {
            name: 'finish_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'inserted_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_activities_groups',
            referencedTableName: 'groups',
            referencedColumnNames: ['id'],
            columnNames: ['group_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('activities');
  }
}
