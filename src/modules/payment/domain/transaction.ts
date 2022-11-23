import AggregateRootInterface from '../../@shared/domain/entity/aggregate-root.interface'
import BaseEntity from '../../@shared/domain/entity/base.entity'
import Id from '../../@shared/domain/value-object/id.value-object'

type TransactionProperties = {
  id?: Id,
  orderId: string,
  amount: number,
  status?: string,
  updatedAt?: Date
  createdAt?: Date,
}

export default class TransactionEntity extends BaseEntity implements AggregateRootInterface {
  private readonly _amount: number
  private readonly _orderId: string
  private _status: string

  constructor (properties: TransactionProperties) {
    super(properties.id, properties.createdAt, properties.updatedAt)

    this._orderId = properties.orderId
    this._amount = properties.amount
    this._status = properties.status || 'pending'
  }

  validate(): void {
    if (this._amount < 0) {
      throw new Error('Amount must be greater than 0')
    }
  }

  approve (): void {
    this._status = 'approved'
  }

  decline (): void {
    this._status = 'decline'
  }

  process (): void {
    if (this._amount >= 100) {
      this.approve()
    } else {
      this.decline()
    }
  }

  get amount (): number {
    return this._amount
  }

  get orderId (): string {
    return this._orderId
  }

  get status (): string {
    return this._status
  }
}