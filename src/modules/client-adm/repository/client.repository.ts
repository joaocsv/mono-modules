import Id from '../../@shared/domain/value-object/id.value-object'
import ClientEntity from '../domain/client.entity'
import ClientGatewayInterface from '../gateway/client.gateway.interface'
import ClientModel from './client.model'

export default class ClientRepository implements ClientGatewayInterface {
  async add(client: ClientEntity): Promise<void> {
    await ClientModel.create({
      id: client.id.id,
      name: client.name,
      email: client.email,
      address: client.address,
      updatedAt: client.updatedAt,
      createdAt: client.createdAt
    })
  }
  
  async find(id: string): Promise<ClientEntity> {
    const client = await ClientModel.findOne({ where: { id }})

    if (!client) {
      throw new Error('Client not found')
    }

    return new ClientEntity({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      address: client.address,
      updatedAt: client.updatedAt,
      createdAt: client.createdAt
    })
  }
}