import ProductAdmFacadeFactory from '../factory/product-adm.facade.factory'
import ProductModel from '../repository/product.model'
import { Sequelize } from 'sequelize-typescript'

describe('ProductAdmFacade test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ ProductModel ])
    
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('should create a product', async () => {
    const productAdmFacade = ProductAdmFacadeFactory.create()

    const input = {
      id: '1',
      name: 'Product test',
      description: 'Product test',
      purchasePrice: 9.40,
      stock: 22
    }

    await productAdmFacade.addProduct(input)

    const product = await ProductModel.findOne({ where: { id: input.id }})

    expect(product).toBeDefined()
    expect(product?.id).toBe(input.id)
    expect(product?.name).toBe(input.name)
    expect(product?.description).toBe(input.description)
    expect(product?.purchasePrice).toBe(input.purchasePrice)
    expect(product?.stock).toBe(input.stock)
  })

  test('should check product stock', async () => {
    const productAdmFacade = ProductAdmFacadeFactory.create()

    const input = {
      id: '1',
      name: 'Product test',
      description: 'Product test',
      purchasePrice: 9.40,
      stock: 22
    }

    await productAdmFacade.addProduct(input)

    const output = await productAdmFacade.checkStock({ productId: '1' })

    expect(output.productId).toBe('1')
    expect(output.stock).toBe(22)
  })
})