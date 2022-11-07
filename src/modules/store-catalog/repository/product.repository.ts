import Id from '../../@shared/domain/value-object/id.value-object'
import ProductEntity from '../domain/product.entity'
import ProductGateway from '../gateway/product.gateway'
import ProductModel from './product.model'

export default class ProductRepository implements ProductGateway {
  async find(id: string): Promise<ProductEntity> {
  }
  
  async findAll(): Promise<ProductEntity[]> {
    const products = await ProductModel.findAll()

    return products.map((product) => new ProductEntity({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    }))
  }
}