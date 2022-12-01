import Id from '../../../@shared/domain/value-object/id.value-object'
import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import ClientAdmFacadeInterface from '../../../client-adm/facade/client-adm.facade.interface'
import InvoiceFacadeInterface from '../../../invoice/facade/invoice.facade.interface'
import PaymentFacadeInterface from '../../../payment/facade/payment.facade.interface'
import ProductAdmFacadeInterface from '../../../product-adm/facade/product-adm.facade.interface'
import StoreCatalogFacadeInterface from '../../../store-catalog/facade/store-catalog.facade.interface'
import ClientEntity from '../../domain/entity/client.entity'
import OrderEntity from '../../domain/entity/order.entity'
import ProductEntity from '../../domain/entity/product.entity'
import Address from '../../domain/value-object/address'
import CheckoutGateway from '../../gateway/checkout.gateway'
import { InputPlaceOrder, OutputPlaceOrder } from './place-order.usecase.dto'

export default class PlaceOrderUseCase implements UseCaseInterface {
  private readonly _clientFacade: ClientAdmFacadeInterface
  private readonly _productFacade: ProductAdmFacadeInterface
  private readonly _storeCatalogFacade: StoreCatalogFacadeInterface
  private readonly _paymentFacade: PaymentFacadeInterface
  private readonly _invoiceFacade: InvoiceFacadeInterface
  private readonly _checkoutRepository: CheckoutGateway

  constructor (clientFacade: ClientAdmFacadeInterface, productFacade: ProductAdmFacadeInterface, storeCatalogFacade: StoreCatalogFacadeInterface, paymentFacade: PaymentFacadeInterface, invoiceFacade: InvoiceFacadeInterface, checkoutRepository: CheckoutGateway) {
    this._clientFacade = clientFacade
    this._productFacade = productFacade
    this._storeCatalogFacade = storeCatalogFacade
    this._paymentFacade = paymentFacade
    this._invoiceFacade = invoiceFacade
    this._checkoutRepository = checkoutRepository
  }

  async execute(input: InputPlaceOrder): Promise<OutputPlaceOrder> {
    const clientDto = await this._clientFacade.find({ id: input.clientId })

    if(!clientDto) {
      throw new Error('Client not found')
    }

    await this.validateProducts(input)

    const products = await Promise.all(
      input.products.map((product) => this.getProduct(product.productId))
    )
    
    const client = new ClientEntity({
      id: new Id(clientDto.id),
      name: clientDto.name,
      document: clientDto.document,
      email: clientDto.email,
      address: new Address(clientDto.address.zipCode, clientDto.address.state, clientDto.address.city, clientDto.address.street, clientDto.address.number, clientDto.address.complement)
    })

    const order = new OrderEntity({
      client: client,
      products: products
    })

    const payment = await this._paymentFacade.process({
      orderId: order.id.id,
      amount: order.total
    })

    const invoice = payment.status === 'approved' ?
      await this._invoiceFacade.generate({
        name: client.name,
        document: client.document,
        zipCode: client.address.zipCode,
        state: client.address.state,
        city: client.address.city,
        street: client.address.street,
        complement: client.address.complement,
        number: client.address.number,
        items: products.map((product) => ({
          id: product.id.id,
          name: product.name,
          price: product.salesPrice
        }))
      }): null

    payment.status === 'approved' && order.approved()
    
    this._checkoutRepository.addOrder(order)

    return {
      id: order.id.id,
      invoiceId: payment.status === 'approved' ? invoice.id : null,
      products: order.products.map((product) => ({
        productId: product.id.id
      })),
      status: order.status,
      total: order.total
    }
  }

  private async validateProducts (input: InputPlaceOrder): Promise<void> {
    if (input.products.length === 0) {
      throw new Error('No products selected')
    }

    for (const p of input.products) {
      const product = await this._productFacade.checkStock({ productId: p.productId })

      if (product.stock <= 0) {
        throw new Error(`Product ${product.productId} is not available in stock`)
      }
    }
  }

  private async getProduct (id: string): Promise<ProductEntity> {
    const productDto = await this._storeCatalogFacade.find({ id: id })

    if (!productDto) {
      throw new Error('Product not found')
    }

    return new ProductEntity({
      id: new Id(productDto.id),
      name: productDto.name,
      description: productDto.description,
      salesPrice: productDto.salesPrice
    })
  }
}