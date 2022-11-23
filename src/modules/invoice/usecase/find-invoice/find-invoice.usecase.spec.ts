import Id from '../../../@shared/domain/value-object/id.value-object'
import Invoice from '../../domain/entity/Invoice'
import ProductEntity from '../../domain/entity/product'
import Address from '../../domain/value-object/address'
import FindInvoiceUseCase from './find-invoice.usecase'

const invoice = new Invoice({
  id: new Id('1'),
  name: 'John Jones',
  document: '999999999',
  items: [
    new ProductEntity({
      name: 'Coca-Cola 2L',
      price: 9.20
    })
  ],
  address: new Address('2312412', 'SP', 'São Paulo', 'Rua XV', 22, 'Casa 27'),
})

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(invoice))
  }
}

describe('Find invoice use case test', () => {
  test('Should find a invoice', async () => {
    const invoiceRepository = MockRepository()
    const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository)
    
    const result = await findInvoiceUseCase.execute({
      id: '1'
    })

    expect(result.id).toBe('1')
    expect(result.name).toBe('John Jones')
    expect(result.document).toBe('999999999')
    expect(result.items.length).toBe(1)
    expect(result.items[0].id).toBeDefined()
    expect(result.items[0].name).toBe('Coca-Cola 2L')
    expect(result.items[0].price).toBe(9.20)
    expect(result.total).toBe(9.20)
    expect(result.address.zipCode).toBe('2312412')
    expect(result.address.state).toBe('SP')
    expect(result.address.city).toBe('São Paulo')
    expect(result.address.street).toBe('Rua XV')
    expect(result.address.number).toBe(22)
    expect(result.address.complement).toBe('Casa 27')
  })
})