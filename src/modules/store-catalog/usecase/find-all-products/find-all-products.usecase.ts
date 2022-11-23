import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import ProductGatewayInterface from '../../gateway/product.gateway.interface'
import { OutputFindAllProducts } from './find-all-products.usecase.dto'

export default class FindAllProductsUseCase implements UseCaseInterface {
  private _productRepository: ProductGatewayInterface

  constructor(productRepository: ProductGatewayInterface) {
    this._productRepository = productRepository
  }

  async execute(): Promise<OutputFindAllProducts> {
    const products = await this._productRepository.findAll()

    return {
      products: products.map(product => ({
        id: product.id.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      }))
    }
  }
}