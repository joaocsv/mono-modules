import Id from '../../@shared/domain/value-object/id.value-object'
import Invoice from '../domain/entity/Invoice'
import ProductEntity from '../domain/entity/product'
import Address from '../domain/value-object/address'
import InvoiceGateway from '../gateway/invoice.gateway'
import InvoiceModel from './model/invoice.model'
import ProductInvoiceModel from './model/product.invoice.model'

export default class InvoiceRepository implements InvoiceGateway {
  async create (invoice: Invoice): Promise<void> {
    await InvoiceModel.create({
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      zipCode: invoice.address.zipCode,
      state: invoice.address.state,
      city: invoice.address.city,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      updatedAt: invoice.updatedAt,
      createdAt: invoice.createdAt,
      items: invoice.items.map(item => ({
        id: item.id.id,
        name: item.name,
        price: item.price
      }))
    }, { include: [{ model: ProductInvoiceModel }] })
  }
  
  async find(id: string): Promise<Invoice> {
    const invoiceModel = await InvoiceModel.findOne({
      where: { id },
      include: { model: ProductInvoiceModel }
    })

    const address = new Address(invoiceModel.zipCode, invoiceModel.state, invoiceModel.city, invoiceModel.street, invoiceModel.number, invoiceModel.complement)

    const items = invoiceModel.items.map(productInvoiceModel => (new ProductEntity({
      id: new Id(productInvoiceModel.id),
      name: productInvoiceModel.name,
      price: productInvoiceModel.price
    })))

    return new Invoice({
      id: new Id(invoiceModel.id),
      name: invoiceModel.name,
      document: invoiceModel.document,
      address: address,
      items: items,
      updateAt: invoiceModel.updatedAt,
      createdAt: invoiceModel.createdAt
    })
  }
}