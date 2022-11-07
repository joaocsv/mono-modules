import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import ProductGateway from '../../gateway/product.gateway'
import { InputCheckStock, OutputCheckStock } from './check-stock.usecase.dto'

export default class CheckStockUseCase implements UseCaseInterface{
  private productRepository: ProductGateway

  constructor (productRepository: ProductGateway) {
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