import AggregateRootInterface from '../../@shared/domain/entity/aggregate-root.interface'
import BaseEntity from '../../@shared/domain/entity/base.entity'
import Id from '../../@shared/domain/value-object/id.value-object'

type ClientEntityProperties = {
  id?: Id,
  name: string,
  email: string,
  address: string,
  createdAt?: Date,
  updatedAt?: Date
}

export default class ClientEntity extends BaseEntity implements AggregateRootInterface {
  private readonly _name: string
  private readonly _email: string
  private readonly _address: string

  constructor (properties: ClientEntityProperties) {
    super(properties.id, properties.createdAt, properties.updatedAt)

    this._name = properties.name
    this._email = properties.email
    this._address = properties.address
  }

  get name (): string {
    return this._name
  }

  get email (): string {
    return this._email
  }

  get address (): string {
    return this._address
  }
}