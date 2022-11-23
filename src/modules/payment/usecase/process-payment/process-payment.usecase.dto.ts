export interface InputProcessPayment {
  orderId: string
  amount: number
}

export interface OutputProcessPayment {
  transactionId: string
  orderId: string
  amount: number
  status: string
  updatedAt: Date
  createdAt: Date
}