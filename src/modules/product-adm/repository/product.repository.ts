import Id from '../../@shared/domain/value-object/id.value-object'
import ProductEntity from '../domain/product.entity'
import ProductGatewayInterface from '../gateway/product.gateway.interface'
import ProductModel from './product.model'

export default class ProductRepository implements ProductGatewayInterface {
  async add(product: ProductEntity): Promise<void> {
    await ProductModel.create({
      id: product.id.id,
      name: product.name,
      description: product.description,
      purchasePrice: product.purchasePrice,
      stock: product.stock,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt
    })
  }
  
  async find(id: string): Promise<ProductEntity> {
    const productModel = await ProductModel.findOne({ where: { id }})

    if (!productModel) {
      throw new Error(`Product with id ${id} not found`)
    }

    const product = new ProductEntity({
      id: new Id(productModel.id),
      name: productModel.name,
      description: productModel.description,
      purchasePrice: productModel.purchasePrice,
      stock: productModel.stock
    })

    return product
  }
}