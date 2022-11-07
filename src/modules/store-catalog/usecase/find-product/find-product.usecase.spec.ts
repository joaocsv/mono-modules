import Id from '../../../@shared/domain/value-object/id.value-object'
import ProductEntity from '../../domain/product.entity'
import FindProductUseCase from './find-product.usecase'

const product = new ProductEntity({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Product Description',
  salesPrice: 120
})

const MockRepository = () => {
  return {
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product))
  }
}
describe('Find product use case tests', () => {
  test('should find a product', async () => {
    const productRepository = MockRepository()
    const usecase = new FindProductUseCase(productRepository)

    const input = {
      id: '1'
    }

    const product = await usecase.execute(input)

    expect(productRepository.find).toHaveBeenCalled()

    expect(product.id).toBe('1')
    expect(product.name).toBe('Product 1')
    expect(product.description).toBe('Product Description')
    expect(product.salesPrice).toBe(120)
  })
})