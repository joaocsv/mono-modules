import TransactionEntity from '../domain/transaction'

export default interface PaymentGateway {
  save (transaction: TransactionEntity): Promise<TransactionEntity>
}