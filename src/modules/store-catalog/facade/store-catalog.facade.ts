import UseCaseInterface from '../../@shared/usecase/usecase.interface'
import FindAllProductsUseCase from '../usecase/find-all-products/find-all-products.usecase'
import FindProductUseCase from '../usecase/find-product/find-product.usecase'
import { InputFindProduct, OutputFindProduct } from '../usecase/find-product/find-product.usecase.dto'
import StoreCatalogFacadeInterface, { InputFindAllStoreCatalogFacade, InputFindStoreCatalogFacade, OutputFindStoreCatalogFacade } from './store-catalog.facade.interface'

export default class StoreCatalogFacade implements StoreCatalogFacadeInterface {
  private readonly _findProductUseCase: FindProductUseCase
  private readonly _findAllProductsUseCase: FindAllProductsUseCase

  constructor (findProductUseCase: FindProductUseCase, findAllProductsUseCase: FindAllProductsUseCase) {
    this._findProductUseCase = findProductUseCase
    this._findAllProductsUseCase = findAllProductsUseCase
  }
  
  async find(input: InputFindStoreCatalogFacade): Promise<OutputFindStoreCatalogFacade> {
    return await this._findProductUseCase.execute(input)
  }

  async findAll (): Promise<InputFindAllStoreCatalogFacade> {
    return await this._findAllProductsUseCase.execute()
  }
}