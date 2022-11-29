import ProductInvoiceModel from '../repository/model/product.invoice.model'
import InvoiceRepository from '../repository/invoice.repository'
import InvoiceModel from '../repository/model/invoice.model'
import FindInvoiceUseCase from '../usecase/find-invoice/find-invoice.usecase'
import GenerateInvoiceUseCase from '../usecase/generate-invoice/generate-invoice.usecase'
import InvoiceFacade from './invoice.facade'
import InvoiceFacadeFactory from '../factory/invoice.facade.factory'

import { Sequelize } from 'sequelize-typescript'

describe('Invoice facade tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ InvoiceModel, ProductInvoiceModel ])
    
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('Should find an invoice', async () => {
    const invoiceFacade = InvoiceFacadeFactory.create()

    await InvoiceModel.create({
      id: '1',
      name: 'John Jones',
      document: '9999999',
      zipCode: '323231',
      state: 'PR',
      city: 'Maringa',
      street: 'Rua alvares silva',
      number: 1299,
      complement: 'Complement',
      items: [{
        id: '1',
        name: 'Coca-Cola',
        price: 9.10
      }],
      createdAt: new Date(),
      updatedAt: new Date()
    }, { include: [{ model: ProductInvoiceModel }] })

    const result = await invoiceFacade.find({ id: '1' })

    expect(result.id).toBe('1')
    expect(result.name).toBe('John Jones')
    expect(result.document).toBe('9999999')
    expect(result.address.zipCode).toBe('323231')
    expect(result.address.state).toBe('PR')
    expect(result.address.city).toBe('Maringa')
    expect(result.address.street).toBe('Rua alvares silva')
    expect(result.address.number).toBe(1299)
    expect(result.address.complement).toBe('Complement')
    expect(result.items.length).toBe(1)
    expect(result.items[0].id).toBe('1')
    expect(result.items[0].name).toBe('Coca-Cola')
    expect(result.items[0].price).toBe(9.10)
  })

  test('Should generate an invoice', async () => {
    const invoiceRepository = new InvoiceRepository()
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository)
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)
    const invoiceFacade = new InvoiceFacade(findInvoiceUseCase, generateInvoiceUseCase)

    const input = {
      name: 'John Jones',
      document: '9999999',
      zipCode: '323231',
      state: 'PR',
      city: 'Maringa',
      street: 'Rua alvares silva',
      number: 1299,
      complement: 'Complement',
      items: [{
        id: '1',
        name: 'Coca-Cola',
        price: 9.10
      }]
    }

    const result = await invoiceFacade.generate(input)

    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.document).toBe(input.document)
    expect(result.zipCode).toBe(input.zipCode)
    expect(result.state).toBe(input.state)
    expect(result.city).toBe(input.city)
    expect(result.street).toBe(input.street)
    expect(result.number).toBe(input.number)
    expect(result.complement).toBe(input.complement)
    expect(result.items.length).toBe(input.items.length)
    expect(result.items[0].id).toBe(input.items[0].id)
    expect(result.items[0].name).toBe(input.items[0].name)
    expect(result.items[0].price).toBe(input.items[0].price)
  })
})