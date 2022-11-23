import ProductEntity from '../domain/product.entity'

export default interface ProductGatewayInterface {
  find(id: string): Promise<ProductEntity>
  findAll(): Promise<ProductEntity[]>
}