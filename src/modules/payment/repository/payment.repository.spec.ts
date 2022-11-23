import TransactionModel from './transaction.model'
import PaymentRepository from './payment.repository'

import { Sequelize } from 'sequelize-typescript'
import TransactionEntity from '../domain/transaction'

describe('Payment repository test', () => {
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

  test('Should save a payment', async () => {
    const transaction = new TransactionEntity({
      orderId: '1',
      amount: 140
    })

    transaction.approve()

    const paymentRepository = new PaymentRepository()
    const result = await paymentRepository.save(transaction)

    expect(result.id.id).toBe(transaction.id.id)
    expect(result.orderId).toBe(transaction.orderId)
    expect(result.amount).toBe(transaction.amount)
    expect(result.status).toBe(transaction.status)
    expect(result.updatedAt).toBe(transaction.updatedAt)
    expect(result.createdAt).toBe(transaction.createdAt)

  })
})