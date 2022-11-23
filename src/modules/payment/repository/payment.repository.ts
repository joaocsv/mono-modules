import TransactionEntity from '../domain/transaction'
import transaction from '../domain/transaction'
import PaymentGateway from '../gateway/payment.gateway'
import TransactionModel from './transaction.model'

export default class PaymentRepository implements PaymentGateway {
  async save (transaction: transaction): Promise<transaction> {
    await TransactionModel.create({
      id: transaction.id.id,
      orderId: transaction.orderId,
      amount: transaction.amount,
      status: transaction.status,
      updatedAt: transaction.updatedAt,
      createdAt: transaction.createdAt
    })

    return new TransactionEntity({
      id: transaction.id,
      orderId: transaction.orderId,
      amount: transaction.amount,
      status: transaction.status,
      updatedAt: transaction.updatedAt,
      createdAt: transaction.createdAt
    })
  }
}