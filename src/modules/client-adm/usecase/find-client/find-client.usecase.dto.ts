export interface InputFindClient {
  id: string
}

export interface OutputFindClient {
  id: string,
  name: string,
  email: string,
  address: string,
  updatedAt: Date,
  createdAt: Date
}