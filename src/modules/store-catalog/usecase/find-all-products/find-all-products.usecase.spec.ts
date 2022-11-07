import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/product.entity'
import ProductGateway from '../../gateway/product.gateway'
import FindAllProductsUseCase from './find-all-products.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Product description 1',
  salesPrice: 20
})

const product2 = new Product({
  id: new Id('2'),
  name: 'Product 2',
  description: 'Product description 2',
  salesPrice: 30
})

const MockRepository = (): ProductGateway => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue([ product, product2 ])
  }
}

describe('Find all products usecase unit test', () => {
  test('Should find all products', async () => {
    const productRepository = MockRepository()
    const findAllProductsUseCase = new FindAllProductsUseCase(productRepository)
    
    const output = await findAllProductsUseCase.execute()
  
    expect(output.products.length).toBe(2)
    
    expect(output.products[0].id).toBe('1')
    expect(output.products[0].name).toBe('Product 1')
    expect(output.products[0].description).toBe('Product description 1')
    expect(output.products[0].salesPrice).toBe(20)

    expect(output.products[1].id).toBe('2')
    expect(output.products[1].name).toBe('Product 2')
    expect(output.products[1].description).toBe('Product description 2')
    expect(output.products[1].salesPrice).toBe(30)
  })
})