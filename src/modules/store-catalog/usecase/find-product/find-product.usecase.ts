import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import ProductGatewayInterface from '../../gateway/product.gateway.interface'
import { InputFindProduct, OutputFindProduct } from './find-product.usecase.dto'

export default class FindProductUseCase implements UseCaseInterface {
  private readonly _productRepository: ProductGatewayInterface

  constructor (productRepository: ProductGatewayInterface) {
    this._productRepository = productRepository
  }

  async execute(input: InputFindProduct): Promise<OutputFindProduct> {
    const product = await this._productRepository.find(input.id)

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }
  }
}