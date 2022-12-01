import AggregateRootInterface from '../../../@shared/domain/entity/aggregate-root.interface'
import BaseEntity from '../../../@shared/domain/entity/base.entity'
import Id from '../../../@shared/domain/value-object/id.value-object'

type ProductProperties = {
  id: Id
  name: string,
  description: string,
  salesPrice: number
}

export default class ProductEntity extends BaseEntity implements AggregateRootInterface {
  private readonly _name: string
  private readonly _description: string
  private readonly _salesPrice: number

  constructor (properties: ProductProperties) {
    super(properties.id)

    this._name = properties.name
    this._description = properties.description
    this._salesPrice = properties.salesPrice
  }

  get name (): string {
    return this._name
  }

  get description (): string {
    return this._description
  }

  get salesPrice (): number {
    return this._salesPrice
  }
}