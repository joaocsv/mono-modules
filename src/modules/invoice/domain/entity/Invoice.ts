import AggregateRootInterface from '../../../@shared/domain/entity/aggregate-root.interface'
import BaseEntity from '../../../@shared/domain/entity/base.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Address from '../value-object/address'
import ProductEntity from './product'

type InvoiceProperties = {
  id?: Id
  name: string
  document: string
  items: ProductEntity[]
  address: Address
  updateAt?: Date
  createdAt?: Date
}

export default class Invoice extends BaseEntity implements AggregateRootInterface {
  private _name: string
  private _document: string
  private _items: ProductEntity[]
  private _address: Address

  constructor (properties: InvoiceProperties) {
    super(properties.id, properties.createdAt, properties.updateAt)

    this._name = properties.name
    this._document = properties.document
    this._items = properties.items
    this._address = properties.address
  }

  get name (): string {
    return this._name
  }

  get document (): string {
    return this._document
  }

  get items (): ProductEntity[] {
    return this._items
  }

  get address (): Address {
    return this._address
  }

  get total (): number {
    return this._items.reduce((sum, product) => sum + product.price, 0)
  }
}