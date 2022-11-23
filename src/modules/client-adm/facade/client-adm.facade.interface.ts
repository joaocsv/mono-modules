export interface InputAddClientFacade {
  name: string,
  email: string,
  address: string
}

export interface OutputAddClientFacade {
  id: string,
  name: string,
  email: string,
  address: string
}

export interface InputFindClientFacade {
  id: string
}

export interface OutputFindClientFacade {
  id: string,
  name: string,
  email: string,
  address: string,
  updatedAt: Date,
  createdAt: Date
}

export default interface ClientAdmFacadeInterface {
  add (input: InputAddClientFacade): Promise<OutputAddClientFacade>
  find (input: InputFindClientFacade): Promise<OutputFindClientFacade>
}