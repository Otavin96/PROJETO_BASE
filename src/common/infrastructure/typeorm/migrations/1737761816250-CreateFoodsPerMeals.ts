import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateFoodsPerMeals1737761816250 implements MigrationInterface {
  name = 'CreateFoodsPerMeals1737761816250'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'foods_per_meals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'food_id',
            type: 'uuid',
          },

          {
            name: 'meal_id',
            type: 'uuid',
          },

          {
            name: 'quantity',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },

          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            name: 'fk_foods_per_meals_food',
            columnNames: ['food_id'],
            referencedTableName: 'foods',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },

          {
            name: 'fk_foods_per_meals_meal',
            columnNames: ['meal_id'],
            referencedTableName: 'meals',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('foods_per_meals')
  }
}
