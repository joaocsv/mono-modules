export interface InputAddProductFacade {
  id?: string
  name: string
  description: string
  purchasePrice: number
  stock: number
}

export interface InputCheckStockFacade {
  productId: string
}

export interface OutputCheckStockFacade {
  productId: string
  stock: number
}