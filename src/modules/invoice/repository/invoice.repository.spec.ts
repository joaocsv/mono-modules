import { Sequelize } from 'sequelize-typescript'
import ProductInvoiceModel from './model/product.invoice.model'
import InvoiceModel from './model/invoice.model'
import InvoiceRepository from './invoice.repository'

describe('Invoice repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize ({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ ProductInvoiceModel, InvoiceModel ])
    
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('Should find a invoice', async () => {
    await InvoiceModel.create({
      id: '1',
      name: 'John Jon',
      document: '232323',
      zipCode: '999999',
      state: 'SP',     
      city: 'São Paulo',      
      street: 'Rua XV',      
      number: 1241,
      complement: 'Casa 27',
      items: [{
        id: '1',
        name: 'Coca-cola',
        price: 2.90
      }],
      updatedAt: new Date(), 
      createdAt: new Date(),
    }, { include: [{ model: ProductInvoiceModel }]})

    const invoiceRepository = new InvoiceRepository()
    const invoice = await invoiceRepository.find('1')
  
    expect(invoice.id.id).toBe('1')
    expect(invoice.name).toBe('John Jon')
    expect(invoice.document).toBe('232323')
    expect(invoice.address.zipCode).toBe('999999')
    expect(invoice.address.state).toBe('SP')
    expect(invoice.address.city).toBe('São Paulo')
    expect(invoice.address.street).toBe('Rua XV')
    expect(invoice.address.number).toBe(1241)
    expect(invoice.address.complement).toBe('Casa 27')
    expect(invoice.items.length).toBe(1)
    expect(invoice.items[0].id.id).toBe('1')
    expect(invoice.items[0].name).toBe('Coca-cola')
    expect(invoice.items[0].price).toBe(2.90)
    expect(invoice.updatedAt).toBeDefined()
    expect(invoice.createdAt).toBeDefined()
  })
})