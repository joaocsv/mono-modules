import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import ProductGateway from '../../gateway/product.gateway'
import { OutputFindAllProducts } from './find-all-products.usecase.dto'

export default class FindAllProductsUseCase implements UseCaseInterface {
  private _productRepository: ProductGateway

  constructor(productRepository: ProductGateway) {
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