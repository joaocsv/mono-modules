import Id from '../../../@shared/domain/value-object/id.value-object'
import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import Invoice from '../../domain/entity/Invoice'
import ProductEntity from '../../domain/entity/product'
import Address from '../../domain/value-object/address'
import InvoiceGateway from '../../gateway/invoice.gateway'
import { InputGenerateInvoice, OutputGenerateInvoice } from './generate-invoice.usecase.dto'

export default class GenerateInvoiceUseCase implements UseCaseInterface {
  private readonly _invoiceRepository: InvoiceGateway

  constructor (invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute (input: InputGenerateInvoice): Promise<OutputGenerateInvoice> {
    const invoice = new Invoice({
      name: input.name,
      document: input.document,
      address: new Address(
        input.zipCode,
        input.state,
        input.city,
        input.street,
        input.number,
        input.complement
      ),
      items: input.items.map(item => new ProductEntity({
        id: new Id(item.id),
        name: item.name,
        price: item.price
      }))
    })

    await this._invoiceRepository.create(invoice)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      })),
      total: invoice.total
    }
  }
}