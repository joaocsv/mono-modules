import ValueObjectInterface from '../../../@shared/domain/value-object/value-object.interface'

export default class Address implements ValueObjectInterface {
  private readonly _zipCode: string
  private readonly _state: string
  private readonly _city: string
  private readonly _street: string
  private readonly _number: number
  private readonly _complement: string

  constructor (zipCode: string, state: string, city: string, street: string, number: number, complement: string) {
    this._zipCode = zipCode
    this._state = state
    this._city = city
    this._street = street
    this._number = number
    this._complement = complement
  }

  get zipCode (): string {
    return this._zipCode
  }

  get state (): string {
    return this._state
  }

  get city (): string {
    return this._city
  }

  get street (): string {
    return this._street
  }
  
  get number (): number {
    return this._number
  }

  get complement (): string {
    return this._complement
  }
}