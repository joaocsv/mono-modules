import Id from '../../@shared/domain/value-object/id.value-object'
import ProductEntity from '../domain/product.entity'
import ProductEntity from '../domain/product.entity'
import ProductGatewayInterface from '../gateway/product.gateway.interface'
import ProductModel from './product.model'

export default class ProductRepository implements ProductGatewayInterface {
  async find(id: string): Promise<ProductEntity> {
    const product = await ProductModel.findOne({ where: { id } })
    
    return new ProductEntity({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice
    })
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