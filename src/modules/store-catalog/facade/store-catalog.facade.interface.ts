export interface InputFindStoreCatalogFacade {
  id: string
}

export interface OutputFindStoreCatalogFacade {
  id: string,
  name: string,
  description: string,
  salesPrice: number
}

export interface InputFindAllStoreCatalogFacade {
  products: {
    id: string,
    name: string,
    description: string,
    salesPrice: number
  }[]
}

export default interface StoreCatalogFacadeInterface {
  find(input: InputFindStoreCatalogFacade): Promise<OutputFindStoreCatalogFacade>
  findAll(): Promise<InputFindAllStoreCatalogFacade>
}