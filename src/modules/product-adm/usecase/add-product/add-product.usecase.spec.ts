import AddProductUseCase from './add-product.usecase'

const mockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('Add product usecase unit test', () => {
  test('should add a product', async () => {
    const productRepository = mockRepository()
    const addProductUseCase = new AddProductUseCase(productRepository)

    const input = {
      name: 'Product Test',
      description: 'Product Test description',
      purchasePrice: 2.30,
      stock: 19
    }

    const output = await addProductUseCase.execute(input)

    expect(productRepository.add).toHaveBeenCalled()
    expect(output.id).toBeDefined
    expect(output.name).toBe(input.name)
    expect(output.description).toBe(input.description)
    expect(output.purchasePrice).toBe(input.purchasePrice)
    expect(output.stock).toBe(input.stock)
  })
})