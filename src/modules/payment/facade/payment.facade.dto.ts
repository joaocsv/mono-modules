export interface InputPaymentFacade {
  orderId: string
  amount: number
}

export interface OutputPaymentFacade {
  transactionId: string
  orderId: string
  amount: number
  status: string
  updatedAt: Date
  createdAt: Date
}