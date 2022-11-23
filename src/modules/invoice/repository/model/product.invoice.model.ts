import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'
import InvoiceModel from './invoice.model'

@Table({
  tableName: 'product_invoice',
  timestamps: false
})
export default class ProductInvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string
  
  @ForeignKey(() => InvoiceModel)
  @Column({ allowNull: false })
  declare invoiceId: string

  @BelongsTo(() => InvoiceModel)
  declare invoice: InvoiceModel
  
  @Column({ allowNull: false })
  declare name: string
  
  @Column({ allowNull: false })
  declare price: number
}