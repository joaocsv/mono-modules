import BaseEntity from '../../../@shared/domain/entity/base.entity'
import AggregateRootInterface from '../../../@shared/domain/entity/aggregate-root.interface'
import Id from '../../../@shared/domain/value-object/id.value-object'
import Address from '../value-object/address'

type ClientProperties = {
  id: Id
  name: string
  document: string
  email: string
  address: Address
}

export default class ClientEntity extends BaseEntity implements AggregateRootInterface {
  private readonly _name: string
  private readonly _document: string
  private readonly _email: string
  private readonly _address: Address

  constructor (properties: ClientProperties) {
    super(properties.id)

    this._name = properties.name
    this._document = properties.document
    this._email = properties.email
    this._address = properties.address
  }

  get name (): string {
    return this._name
  }

  get document (): string {
    return this._document
  }

  get email (): string {
    return this._email
  }

  get address (): Address {
    return this._address
  }
}