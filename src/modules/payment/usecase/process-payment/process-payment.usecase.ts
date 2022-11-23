import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import TransactionEntity from '../../domain/transaction'
import PaymentGateway from '../../gateway/payment.gateway'
import { InputProcessPayment, OutputProcessPayment } from './process-payment.usecase.dto'

export default class ProcessPaymentUseCase implements UseCaseInterface {
  private readonly paymentRepository: PaymentGateway

  constructor(paymentRepository: PaymentGateway) {
    this.paymentRepository = paymentRepository
  }

  async execute(input: InputProcessPayment): Promise<OutputProcessPayment> {
    const transaction = new TransactionEntity({
      orderId: input.orderId,
      amount: input.amount
    })

    transaction.process()

    const transactionSaved = await this.paymentRepository.save(transaction)

    return {
      transactionId: transactionSaved.id.id,
      orderId: transactionSaved.orderId,
      amount: transactionSaved.amount,
      status: transactionSaved.status,
      createdAt: transactionSaved.createdAt,
      updatedAt: transactionSaved.updatedAt
    }
  }

}
