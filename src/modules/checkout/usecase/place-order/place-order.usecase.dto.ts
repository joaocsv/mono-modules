export interface InputPlaceOrder {
  clientId: string
  products: {
    productId: string
  }[]
}

export interface OutputPlaceOrder {
  id: string
  invoiceId: string
  status: string
  total: number
  products: {
    productId: string
  }[]
}