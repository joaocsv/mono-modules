import AggregateRootInterface from '../../@shared/domain/entity/aggregate-root.interface'
import BaseEntity from '../../@shared/domain/entity/base.entity'
import Id from '../../@shared/domain/value-object/id.value-object'

type ProductProperties = {
  id: Id
  name: string
  description: string
  purchasePrice: number
  stock: number
}

export default class ProductEntity extends BaseEntity implements AggregateRootInterface {
  private _name: string
  private _description: string
  private _purchasePrice: number
  private _stock: number

  constructor(properties: ProductProperties) {
    super(properties.id)

    this._name = properties.name
    this._description = properties.description
    this._purchasePrice = properties.purchasePrice
    this._stock = properties.stock
  }

  get name (): string {
    return this._name
  }

  get description (): string {
    return this._description
  }

  get purchasePrice (): number {
    return this._purchasePrice
  }

  get stock (): number {
    return this._stock
  }

  set name (name: string) {
    this._name = name
  }

  set description (description: string) {
    this._description = description
  }

  set purchasePrice (purchasePrice: number) {
    this._purchasePrice = purchasePrice
  }

  set stock (stock: number) {
    this._stock = stock
  }
}