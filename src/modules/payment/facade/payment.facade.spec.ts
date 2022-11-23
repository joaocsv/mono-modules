import { Sequelize } from 'sequelize-typescript'
import PaymentRepository from '../repository/payment.repository'
import TransactionModel from '../repository/transaction.model'
import ProcessPaymentUseCase from '../usecase/process-payment/process-payment.usecase'
import PaymentFacade from './payment.facade'

describe('Payment facade tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ TransactionModel ])
    
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('Should create a transaction', async () => {
    const repository = new PaymentRepository()
    const processPaymentUseCase = new ProcessPaymentUseCase(repository)
    const paymentFacade = new PaymentFacade(processPaymentUseCase)

    const output = await paymentFacade.process({
      orderId: '1',
      amount: 100
    })

    expect(output.transactionId).toBeDefined()
    expect(output.orderId).toBe('1')
    expect(output.amount).toBe(100)
    expect(output.status).toBe('approved')
    expect(output.updatedAt).toBeDefined()
    expect(output.createdAt).toBeDefined()
  })
})