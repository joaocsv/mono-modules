import ProductEntity from '../domain/product.entity'

export default interface ProductGatewayInterface {
  add (product: ProductEntity): Promise<void>
  find (id: string): Promise<ProductEntity>
}