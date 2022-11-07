import { Table, Model, PrimaryKey, Column  } from 'sequelize-typescript'

@Table({
  tableName: 'product',
  timestamps: false
})

export default class ProductModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare description: string

  @Column({ allowNull: false })
  declare salesPrice: number
}