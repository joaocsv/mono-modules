import Id from '../../../@shared/domain/value-object/id.value-object'
import ProductEntity from '../../domain//entity/product.entity'
import PlaceOrderUseCase from './place-order.usecase'
import { InputPlaceOrder } from './place-order.usecase.dto'

const mockDate = new Date(2000, 1, 1)

describe('Place order use case unit tests', () => {
  //@ts-expect-error - no params in constructor
  const placeOrderUseCase = new PlaceOrderUseCase()

  describe('Validate products method', () => {
    test('Should throw error if no products are selected', async () => {
      const input: InputPlaceOrder = { clientId: '0', products: [] }

      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrow(new Error('No products selected'))
    })
    
    test('Should throw an error when product is out of stock', async () => {
      const mockCheckStock = {
        checkStock: jest.fn(({productId}: {productId: string}) => ({
          productId: productId,
          stock: productId === '1' ? 0: 1
        }))
      }

      //@ts-expect-error - force set productFacade
      placeOrderUseCase['_productFacade'] = mockCheckStock

      let input: InputPlaceOrder = {
         clientId: '0',
         products: [{ productId: '1' }]
      }
      
      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrowError(new Error('Product 1 is not available in stock'))
      expect(mockCheckStock.checkStock).toHaveBeenCalledTimes(1)

      input = {
        clientId: '0',
        products: [{ productId: '0' }, { productId: '1' }]
      }
     
      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrowError(new Error('Product 1 is not available in stock'))
      expect(mockCheckStock.checkStock).toHaveBeenCalledTimes(3)


      input = {
        clientId: '0',
        products: [{ productId: '0' }, { productId: '0' }, { productId: '1' }]
      }
   
      await expect(placeOrderUseCase['validateProducts'](input)).rejects.toThrowError(new Error('Product 1 is not available in stock'))
      expect(mockCheckStock.checkStock).toHaveBeenCalledTimes(6)
    })
  })

  describe('GetProduct method', () => {
    beforeAll(() => {
      jest.useFakeTimers()
      jest.setSystemTime(mockDate)
    })

    afterAll(() => {
      jest.useFakeTimers()
    })

    //@ts-expect-error - no params in constructor
    const placeOrderUseCase = new PlaceOrderUseCase()
    
    test('Should throw an error when product not found', () => {
      const mockStoreCatalog = {
        find: jest.fn().mockResolvedValue(null)
      }

      //@ts-expect-error - force set storeCatalogFacade
      placeOrderUseCase['_storeCatalogFacade'] = mockStoreCatalog

      expect(placeOrderUseCase['getProduct']('0')).rejects.toThrow(
        new Error('Product not found')
      )
    })

    test('Should return a product', () => {
      const mockStoreCatalog = {
        find: jest.fn().mockResolvedValue({
          id: '1',
          name: 'Product 1',
          description: 'Product 1 description',
          salesPrice: 100
        })
      }

      //@ts-expect-error - force set storeCatalogFacade
      placeOrderUseCase['_storeCatalogFacade'] = mockStoreCatalog

      expect(placeOrderUseCase['getProduct']('1')).resolves.toEqual(
        new ProductEntity({
          id: new Id('1'),
          name: 'Product 1',
          description: 'Product 1 description',
          salesPrice: 100
        })
      )

      expect(mockStoreCatalog.find).toHaveBeenCalledTimes(1)
    })
  })

  
  describe('Execute method', () => {
    test('Should throw if client not found', async () => {
      const mockClientFacade = {
        find: jest.fn().mockReturnValue(null)
      }

      //@ts-expect-error - no params in constructor 
      const placeOrderUseCase = new PlaceOrderUseCase()

      //@ts-expect-error - force set clientFacade
      placeOrderUseCase['_clientFacade'] = mockClientFacade

      const input: InputPlaceOrder = { clientId: '0', products: [] }

      await expect(placeOrderUseCase.execute(input)).rejects.toThrow(new Error('Client not found'))
    })

    test('Should throw an error when products are not valid', async () => {
      const mockClientFacade = {
        find: jest.fn().mockReturnValue(true)
      }

      //@ts-expect-error - no params in constructor 
      const placeOrderUseCase = new PlaceOrderUseCase()

      const validateProductsSpy = jest
      //@ts-expect-error - spy on private method
      .spyOn(placeOrderUseCase, 'validateProducts')
    
      //@ts-expect-error - force set clientFacade
      placeOrderUseCase['_clientFacade'] = mockClientFacade

      const input: InputPlaceOrder = { clientId: '0', products: [] }
      
      await expect(placeOrderUseCase.execute(input)).rejects.toThrowError(new Error('No products selected'))
      
      expect(validateProductsSpy).toHaveBeenCalledTimes(1)
    })
  })

  describe('Place an order', () => {
    const client = {
      id: '1c',
      name: 'Client test',
      document: '99999',
      email: 'client@client.com',
      address: {
        zipCode: '999999',
        state: 'PR',
        city: 'Maringa',
        street: 'Street xv',
        number: 2000,
        complement: 'Apartament 29'
      }
    }

    const mockClientFacade = {
      find: jest.fn().mockResolvedValue(client)
    }

    const mockPaymentFacade = {
      process: jest.fn()
    }

    const mockCheckoutRepo = {
      addOrder: jest.fn()
    }

    const mockInvoiceFacade = {
      generate: jest.fn().mockResolvedValue({ id: '1i' })
    }

    const placeOrderUseCase = new PlaceOrderUseCase(mockClientFacade as any, null as any, null as any, mockPaymentFacade, mockInvoiceFacade as any, mockCheckoutRepo as any)
  
    const products = {
      '1': new ProductEntity({
        id: new Id('1'),
        name: 'Product 1',
        description: 'some description',
        salesPrice: 40
      }),
      '2': new ProductEntity({
        id: new Id('2'),
        name: 'Product 2',
        description: 'some description',
        salesPrice: 30
      })
    }

    const mockValidateProducts = jest
    //@ts-expect-error spy on private method
    .spyOn(placeOrderUseCase, 'validateProducts')
    //@ts-expect-error not return never
    .mockResolvedValue(null)

    const mockGetProduct = jest
    //@ts-expect-error spy on private method
    .spyOn(placeOrderUseCase, 'getProduct')
    //@ts-expect-error not return never
    .mockImplementation((productId: keyof typeof products) => {
      return products[productId]
    })

    test('Should not be approved', async () => {
      mockPaymentFacade.process.mockReturnValue({
        transactionId: '1t',
        orderId: '1o',
        amount: 70,
        status: 'error',
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const input: InputPlaceOrder = {
        clientId: '1c',
        products: [{ productId: '1' }, { productId: '2' } ]
      }

      const output = await placeOrderUseCase.execute(input)

      expect(output.invoiceId).toBeNull()
      expect(output.total).toBe(70)
      expect(output.products).toStrictEqual([
        { productId: '1' },
        { productId: '2' },
      ])
      expect(mockClientFacade.find).toHaveBeenCalledTimes(1)
      expect(mockClientFacade.find).toHaveBeenCalledWith({ id: '1c' })
      expect(mockValidateProducts).toHaveBeenCalledTimes(1)
      expect(mockValidateProducts).toHaveBeenCalledWith(input)
      expect(mockGetProduct).toHaveBeenCalledTimes(2)
      expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1)
      expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1)
      expect(mockPaymentFacade.process).toHaveBeenCalledWith({
        orderId: output.id,
        amount: output.total
      })
      expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(0)
    })

    test('Should be approved', async () => {
      mockPaymentFacade.process.mockReturnValue({
        transactionId: '1t',
        orderId: '1o',
        amount: 70,
        status: 'approved',
        createdAt: new Date(),
        updatedAt: new Date()
      })

      const input: InputPlaceOrder = {
        clientId: '1c',
        products: [{ productId: '1' }, { productId: '2' } ]
      }

      const output = await placeOrderUseCase.execute(input)

      expect(output.invoiceId).toBe('1i')
      expect(output.total).toBe(70)
      expect(output.products).toStrictEqual([
        { productId: '1' },
        { productId: '2' },
      ])
      expect(mockClientFacade.find).toHaveBeenCalledTimes(1)
      expect(mockClientFacade.find).toHaveBeenCalledWith({ id: '1c' })
      expect(mockValidateProducts).toHaveBeenCalledTimes(1)
      expect(mockValidateProducts).toHaveBeenCalledWith(input)
      expect(mockGetProduct).toHaveBeenCalledTimes(2)
      expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1)
      expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1)
      expect(mockPaymentFacade.process).toHaveBeenCalledWith({
        orderId: output.id,
        amount: output.total
      })
      expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1)
      expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
        name: 'Client test',
        document: '99999',
        zipCode: '999999',
        state: 'PR',
        city: 'Maringa',
        street: 'Street xv',
        number: 2000,
        complement: 'Apartament 29',
        items: [
          {
            id: products['1'].id.id,
            name: products['1'].name,
            price: products['1'].salesPrice
          },
          {
            id: products['2'].id.id,
            name: products['2'].name,
            price: products['2'].salesPrice
          }
        ]
      })
    })
  })
})