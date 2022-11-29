import GenerateInvoiceUseCase from './generate-invoice.usecase'
import InvoiceGateway from '../../gateway/invoice.gateway'

const MockInvoiceRepository = () => {
  return {
    find: jest.fn(),
    create: jest.fn()
  }
}

describe('Generate invoice usecase unit tests', () => {
  test('Should generate an invoice', async () => {
    const invoiceRepository = MockInvoiceRepository()
    const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository)

    const input = {
      name: 'Fulano SR',
      document: '9999999',
      zipCode: '9999999',
      state: 'SP',
      city: 'São Paulo',
      street: 'Rua XV',
      number: 22,
      complement: 'Casa 27',
      items: [{
        id: '2',
        name: 'Item 1',
        price: 2.20
      }, {
        id: '6',
        name: 'Item 2',
        price: 14.21
      }]
    }

    const result = await generateInvoiceUseCase.execute(input)

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
    expect(result.items[1].id).toBe(input.items[1].id)
    expect(result.items[1].name).toBe(input.items[1].name)
    expect(result.items[1].price).toBe(input.items[1].price)
  })
})