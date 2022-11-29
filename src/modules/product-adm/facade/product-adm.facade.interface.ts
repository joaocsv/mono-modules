import { InputAddProductFacade, InputCheckStockFacade, OutputCheckStockFacade } from './product-adm.facade.dto'

export default interface ProductAdmFacadeInterface {
  addProduct(input: InputAddProductFacade): Promise<void>
  checkStock(input: InputCheckStockFacade): Promise<OutputCheckStockFacade>
}