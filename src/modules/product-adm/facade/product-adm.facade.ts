import UseCaseInterface from '../../@shared/usecase/usecase.interface'
import ProductAdmFacadeInterface, { InputAddProduct, InputCheckStock, OutputCheckStock } from './product-adm.facade.interface'

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private readonly addProductUseCase: UseCaseInterface
  private readonly checkStockUseCase: UseCaseInterface

  constructor (addProductUseCase: UseCaseInterface, checkStockUseCase: UseCaseInterface) {
    this.addProductUseCase = addProductUseCase
    this.checkStockUseCase = checkStockUseCase
  }

  async addProduct(input: InputAddProduct): Promise<void> {
    return this.addProductUseCase.execute(input)
  }

  async checkStock(input: InputCheckStock): Promise<OutputCheckStock> {
    return this.checkStockUseCase.execute(input)
  }
}