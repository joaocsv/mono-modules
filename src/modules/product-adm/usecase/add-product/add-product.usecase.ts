import Id from '../../../@shared/domain/value-object/id.value-object'
import ProductEntity from '../../domain/product.entity'
import ProductGatewayInterface from '../../gateway/product.gateway.interface'
import { InputAddProduct, OutputAddProduct } from './add-product.usecase.dto'

export default class AddProductUseCase {
  private readonly _productRepository: ProductGatewayInterface
  
  constructor(productRepository: ProductGatewayInterface) {
    this._productRepository = productRepository
  }

  async execute(input: InputAddProduct): Promise<OutputAddProduct> {
    const product = new ProductEntity({
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      purchasePrice: input.purchasePrice,
      stock: input.stock
    })

    await this._productRepository.add(product)

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    }
  }
}