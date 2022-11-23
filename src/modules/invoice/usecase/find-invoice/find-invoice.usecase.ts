import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import InvoiceGateway from '../../gateway/invoice.gateway'
import { InputFindInvoice, OutputFindInvoice } from './find-invoice.usecase.dto'

export default class FindInvoiceUseCase implements UseCaseInterface {
  private _invoiceRepository: InvoiceGateway

  constructor (invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute (input: InputFindInvoice): Promise<OutputFindInvoice> {
    const invoice = await this._invoiceRepository.find(input.id)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      items: invoice.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      })),
      total: invoice.total,
      address: {
        zipCode: invoice.address.zipCode,
        state: invoice.address.state,
        city: invoice.address.city,
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement
      },
      createdAt: invoice.createdAt
    }
  }
}