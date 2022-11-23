import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import ProductGatewayInterface from '../../gateway/product.gateway.interface'
import { InputCheckStock, OutputCheckStock } from './check-stock.usecase.dto'

export default class CheckStockUseCase implements UseCaseInterface{
  private productRepository: ProductGatewayInterface

  constructor (productRepository: ProductGatewayInterface) {
    this.productRepository = productRepository
  }

  async execute(input: InputCheckStock): Promise<OutputCheckStock> {
    const product = await this.productRepository.find(input.productId)
    
    return {
      productId: product.id.id,
      stock: product.stock
    }
  }
}