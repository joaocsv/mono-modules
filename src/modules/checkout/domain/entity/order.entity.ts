import BaseEntity from '../../../@shared/domain/entity/base.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'
import ClientEntity from './client.entity'
import ProductEntity from './product.entity'

type OrderProperties = {
  id?: Id
  client: ClientEntity
  products: ProductEntity[]
  status?: string
}

export default class OrderEntity extends BaseEntity {
  private readonly _client: ClientEntity
  private readonly _products: ProductEntity[]
  private _status: string

  constructor (properties: OrderProperties) {
    super (properties.id)

    this._client = properties.client
    this._products = properties.products
    this._status = properties.status || 'pending'
  }

  get client (): ClientEntity {
    return this._client
  }

  get products (): ProductEntity[] {
    return this._products
  }

  get status (): string {
    return this._status
  }

  get total (): number {
    return this.products.reduce((total, product) => total + product.salesPrice, 0)
  }

  approved (): void {
    this._status = 'approved'
  }
}