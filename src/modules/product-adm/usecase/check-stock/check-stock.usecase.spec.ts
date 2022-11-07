import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/product.entity'
import CheckStockUseCase from './check-stock.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product test',
  description: 'Product test description',
  purchasePrice: 20.40,
  stock: 20
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(product)
  }
}

describe('Check stock unit test', () => {
  test('should get stock of a product', async () => {
    const productRepository = MockRepository()
    const checkStockUseCase = new CheckStockUseCase(productRepository)

    const input = {
      productId: '1'
    }

    const output = await checkStockUseCase.execute(input)

    expect(productRepository.find).toHaveBeenCalled()
    expect(output.productId).toBe(input.productId)
    expect(output.stock).toBe(20)
  })
})