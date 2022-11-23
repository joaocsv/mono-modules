import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import ProductInvoiceModel from './product.invoice.model'

@Table({
  timestamps: false
})
export default class InvoiceModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string

  @Column({ allowNull: false })
  declare name: string

  @Column({ allowNull: false })
  declare document: string
  
  @Column({ allowNull: false })
  declare zipCode: string
  
  @Column({ allowNull: false })
  declare state: string
  
  @Column({ allowNull: false })
  declare city: string
  
  @Column({ allowNull: false })
  declare street: string
  
  @Column({ allowNull: false })
  declare number: number
  
  @Column({ allowNull: false })
  declare complement: string
  
  @Column({ allowNull: false })
  declare updatedAt: Date
  
  @Column({ allowNull: false })
  declare createdAt: Date

  @HasMany(() => ProductInvoiceModel)
  declare items: ProductInvoiceModel[]
}