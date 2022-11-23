import AddClientUseCase from '../usecase/add-client/add-client.usecase'
import FindClientUseCase from '../usecase/find-client/find-client.usecase'
import ClientAdmFacadeInterface, { InputAddClientFacade, InputFindClientFacade, OutputAddClientFacade, OutputFindClientFacade } from './client-adm.facade.interface'

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private readonly _addClientUseCase: AddClientUseCase
  private readonly _findClientUseCase: FindClientUseCase
  
  constructor (addClientUseCase: AddClientUseCase, findClientUseCase: FindClientUseCase) {
    this._addClientUseCase = addClientUseCase
    this._findClientUseCase = findClientUseCase
  }

  async add (input: InputAddClientFacade): Promise<OutputAddClientFacade> {
    return await this._addClientUseCase.execute(input)
  }

  async find (input: InputFindClientFacade): Promise<OutputFindClientFacade> {
    return await this._findClientUseCase.execute(input)
  }
}