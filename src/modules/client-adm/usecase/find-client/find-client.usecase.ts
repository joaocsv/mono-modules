import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import ClientGatewayInterface from '../../gateway/client.gateway.interface'
import { InputFindClient, OutputFindClient } from './find-client.usecase.dto'

export default class FindClientUseCase implements UseCaseInterface {
  private readonly _clientRepository: ClientGatewayInterface

  constructor (clientRepository: ClientGatewayInterface) {
    this._clientRepository = clientRepository
  }

  async execute(input: InputFindClient): Promise<OutputFindClient> {
    const client = await this._clientRepository.find(input.id)
    
    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      updatedAt: client.updatedAt,
      createdAt: client.createdAt
    }
  }
}