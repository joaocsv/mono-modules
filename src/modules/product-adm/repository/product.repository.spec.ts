import { Sequelize } from 'sequelize-typescript'

import ProductModel from './product.model'
import ProductRepository from './product.repository'
import Id from '../../@shared/domain/value-object/id.value-object'
import Product from '../domain/product.entity'

describe('ProductRepository test', () => {
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

  it('should create a product', async () => {
    const productRepository = new ProductRepository()

    const product = new Product({
      id: new Id('1'),
      name: 'Product test',
      description: 'Product test description',
      purchasePrice: 2.30,
      stock: 20
    })
    
    await productRepository.add(product)

    const productDb = await ProductModel.findOne({ where: { id: product.id.id } })
  
    expect(productDb?.id).toEqual(product.id.id)
    expect(productDb?.name).toEqual(product.name)
    expect(productDb?.description).toEqual(product.description)
    expect(productDb?.purchasePrice).toEqual(product.purchasePrice)
    expect(productDb?.stock).toEqual(product.stock)
  })

  it('should find a product', async () => {
    ProductModel.create({
      id: '1',
      name: 'Product test',
      description: 'Product test description',
      purchasePrice: 2.30,
      stock: 20,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    
    const productRepository = new ProductRepository()
    const product = await productRepository.find('1')

    expect(product.id.id).toBe('1')
    expect(product.name).toBe('Product test')
    expect(product.description).toBe('Product test description')
    expect(product.purchasePrice).toBe(2.30)
    expect(product.stock).toBe(20)
  })
})