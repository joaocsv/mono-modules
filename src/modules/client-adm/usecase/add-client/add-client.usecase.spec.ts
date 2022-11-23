import AddClientUseCase from './add-client.usecase'

const MockRepository = () => {
  return {
    add: jest.fn(),
    find: jest.fn()
  }
}

describe('Add client use case unit tests', () => {
  test('Should add a client', async () => {
    const clientRepository = MockRepository()
    const addClientUseCase = new AddClientUseCase(clientRepository)
    
    const input = {
      name: 'Jon jones',
      email: 'jon@jones.com',
      address: 'Rua irineu 800'
    }
    
    const result = await addClientUseCase.execute(input)

    expect(result.id).toBeDefined()
    expect(result.name).toBe(input.name)
    expect(result.email).toBe(input.email)
    expect(result.address).toBe(input.address)
  })
})