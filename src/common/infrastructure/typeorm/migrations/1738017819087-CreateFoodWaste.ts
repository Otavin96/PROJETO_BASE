import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateFoodWaste1738017819087 implements MigrationInterface {
  name = 'CreateFoodWaste1738017819087'

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'food_waste',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'meal_id',
            type: 'uuid',
            isNullable: false, // A refeição deve sempre ser especificada
          },
          {
            name: 'food_per_meal_id',
            type: 'uuid',
            isNullable: false, // O alimento por refeição também deve ser especificado
          },
          {
            name: 'waste_quantity',
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
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    )

    await queryRunner.createForeignKey(
      'food_waste',
      new TableForeignKey({
        columnNames: ['meal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'meals',
        onDelete: 'CASCADE', // Apaga os registros de desperdício se a refeição for excluída
        onUpdate: 'CASCADE',
      }),
    )

    // Foreign key para food_per_meal_id
    await queryRunner.createForeignKey(
      'food_waste',
      new TableForeignKey({
        columnNames: ['food_per_meal_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'foods_per_meals',
        onDelete: 'CASCADE', // Apaga os registros de desperdício se o alimento relacionado for excluído
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove as foreign keys
    await queryRunner.dropForeignKey('food_waste', 'FK_meal_id')
    await queryRunner.dropForeignKey('food_waste', 'FK_food_per_meal_id')

    // Remove a tabela
    await queryRunner.dropTable('food_waste')
  }
}
