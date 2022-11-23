import TransactionEntity from '../../domain/transaction'
import ProcessPaymentUseCase from './process-payment.usecase'

const transactionApproved = new TransactionEntity({
  orderId: '1',
  amount: 100,
  status: 'approved'
})

const MockRepositoryApproved = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionApproved))
  }
}

const transactionDeclined = new TransactionEntity({
  orderId: '1',
  amount: 50,
  status: 'declined'
})

const MockRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined))
  }
}

describe('Process payment usecase unit tests', () => {
  test('Should approved a payment', async () => {
    const paymentRepository = MockRepositoryApproved()
    const processPaymentUseCase = new ProcessPaymentUseCase(paymentRepository)

    const result = await processPaymentUseCase.execute({
      orderId: '1',
      amount: 100
    })

    expect(paymentRepository.save).toHaveBeenCalled()

    expect(result.transactionId).toBe(transactionApproved.id.id)
    expect(result.orderId).toBe(transactionApproved.orderId)
    expect(result.amount).toBe(transactionApproved.amount)
    expect(result.status).toBe('approved')
    expect(result.createdAt).toBe(transactionApproved.createdAt)
    expect(result.updatedAt).toBe(transactionApproved.updatedAt)
  })

  test('Should decline a payment', async () => {
    const paymentRepository = MockRepositoryDeclined()
    const processPaymentUseCase = new ProcessPaymentUseCase(paymentRepository)

    const result = await processPaymentUseCase.execute({
      orderId: '1',
      amount: 50
    })

    expect(paymentRepository.save).toHaveBeenCalled()

    expect(result.transactionId).toBe(transactionDeclined.id.id)
    expect(result.orderId).toBe(transactionDeclined.orderId)
    expect(result.amount).toBe(transactionDeclined.amount)
    expect(result.status).toBe('declined')
    expect(result.createdAt).toBe(transactionDeclined.createdAt)
    expect(result.updatedAt).toBe(transactionDeclined.updatedAt)
  })
})