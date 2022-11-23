import BaseEntity from '../../../@shared/domain/entity/base.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'

type ProductProperties = {
  id?: Id
  name: string
  price: number
}

export default class ProductEntity extends BaseEntity {
  private readonly _name: string
  private readonly _price: number

  constructor(properties: ProductProperties) {
    super(properties.id)

    this._name = properties.name
    this._price = properties.price
  }

  get name (): string {
    return this._name
  }

  get price (): number {
    return this._price
  }
}