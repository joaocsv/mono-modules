export interface InputAddProduct {
  id?: string
  name: string
  description: string
  purchasePrice: number
  stock: number
}

export interface InputCheckStock {
  productId: string
}

export interface OutputCheckStock {
  productId: string
  stock: number
}

export default interface ProductAdmFacadeInterface {
  addProduct(input: InputAddProduct): Promise<void>
  checkStock(input: InputCheckStock): Promise<OutputCheckStock>
}