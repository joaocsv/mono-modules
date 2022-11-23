import { Column, Model, PrimaryKey, Table } from 'sequelize-typescript'

@Table
export default class TransactionModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string
  
  @Column({ allowNull: false, field: 'order_id' })
  declare orderId: Date

  @Column({ allowNull: false })
  declare amount: number

  @Column({ allowNull: false })
  declare status: string
  
  @Column({ allowNull: false, field: 'updated_at' })
  declare updatedAt: Date

  @Column({ allowNull: false, field: 'created_at' })
  declare createdAt: Date
}