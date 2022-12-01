export interface InputAddClientFacade {
  name: string,
  email: string,
  address: {
    zipCode: string;
    state: string;
    city: string;
    street: string;
    number: number;
    complement: string;
  },
}

export interface OutputAddClientFacade {
  id: string,
  name: string,
  email: string,
  address: {
    zipCode: string;
    state: string;
    city: string;
    street: string;
    number: number;
    complement: string;
  }
}

export interface InputFindClientFacade {
  id: string
}

export interface OutputFindClientFacade {
  id: string,
  name: string,
  email: string,
  document: string,
  address: {
    zipCode: string;
    state: string;
    city: string;
    street: string;
    number: number;
    complement: string;
  },
  updatedAt: Date,
  createdAt: Date
}