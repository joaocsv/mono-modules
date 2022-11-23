import Id from '../../../@shared/domain/value-object/id.value-object'
import ClientEntity from '../../domain/client.entity'
import FindClientUseCase from './find-client.usecase'

const client = new ClientEntity({
  id: new Id('1'),
  name: 'Jon jones',
  email: 'jon@jones.com',
  address: 'Rua irineu 800'
})

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn().mockReturnValue(client)
  }
}

describe('Find client use case unit tests', () => {
  test('Should find a client', async () => {
    const clientRepository = MockRepository()
    const findClientUseCase = new FindClientUseCase(clientRepository)
    
    const input = {
      id: '1',
    }
    
    const result = await findClientUseCase.execute(input)

    expect(result.id).toBeDefined()
    expect(result.name).toBe(client.name)
    expect(result.email).toBe(client.email)
    expect(result.address).toBe(client.address)
    expect(result.updatedAt).toBe(client.updatedAt)
    expect(result.createdAt).toBe(client.createdAt)
  })
})