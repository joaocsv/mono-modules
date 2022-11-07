export interface OutputFindAllProducts {
  products: {
    id: string
    name: string
    description: string
    salesPrice: number
  }[]
}