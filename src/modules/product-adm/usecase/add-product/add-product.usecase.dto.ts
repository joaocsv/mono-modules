export interface InputAddProduct {
  id?: string;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
}

export interface OutputAddProduct {
  id: string
  name: string
  description: string
  purchasePrice: number
  stock: number
  createdAt: Date
  updatedAt: Date
}