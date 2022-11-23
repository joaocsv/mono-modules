export interface InputFindInvoice {
  id: string
}

export interface OutputFindInvoice {
  id: string
  name: string
  document: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
  address: {
    street: string;
    number: number;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: Date;
}