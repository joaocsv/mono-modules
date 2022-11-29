export interface InputFindInvoiceFacade {
  id: string
}

export interface OutputFindInvoiceFacade {
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

export interface InputGenerateInvoiceFacade {
  name: string;
  document: string;
  street: string;
  number: number;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}

export interface OutputGenerateInvoiceFacade {
  id: string;
  name: string;
  document: string;
  street: string;
  number: number;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}