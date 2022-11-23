import Id from '../../../@shared/domain/value-object/id.value-object'
import UseCaseInterface from '../../../@shared/usecase/usecase.interface'
import ClientEntity from '../../domain/client.entity'
import ClientGatewayInterface from '../../gateway/client.gateway.interface'
import { InputAddClient, OutputAddClient } from './add-client.usecase.dto'

export default class AddClientUseCase implements UseCaseInterface {
  private readonly _clientRepository: ClientGatewayInterface
  
  constructor (clientRepository: ClientGatewayInterface) {
    this._clientRepository = clientRepository
  }
  
  async execute(input: InputAddClient): Promise<OutputAddClient> {
    const client = new ClientEntity({
      id: new Id(input.id),
      name: input.name,
      email: input.email,
      address: input.address
    })

    await this._clientRepository.add(client)
    
    return {
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address
    }
  }
}