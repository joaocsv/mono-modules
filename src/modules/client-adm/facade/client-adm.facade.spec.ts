import { Sequelize } from 'sequelize-typescript'
import ClientModel from '../repository/client.model'
import ClientRepository from '../repository/client.repository'
import AddClientUseCase from '../usecase/add-client/add-client.usecase'
import FindClientUseCase from '../usecase/find-client/find-client.usecase'
import ClientAdmFacade from './client-adm.facade'

describe('Client adm facade test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })

    sequelize.addModels([ ClientModel ])
    
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  test('Should create a client', async () => {
    const repository = new ClientRepository()
    const addClientUseCase = new AddClientUseCase(repository)
    const findClientUseCase = new FindClientUseCase(repository)
    const clientAdmFacade = new ClientAdmFacade(addClientUseCase, findClientUseCase)
    
    const input = {
      id: '11',
      name: 'Fulano',
      email: 'email@mail.com',
      address: 'Address'
    }

    await clientAdmFacade.add(input)

    const clientModel = await ClientModel.findOne({ where : { id: '11' }})
    
    expect(clientModel).toBeDefined()

    expect(clientModel!.id).toBe('11')
    expect(clientModel!.name).toBe('Fulano')
    expect(clientModel!.email).toBe('email@mail.com')
    expect(clientModel!.address).toBe('Address')
  })

  test('Should find a client', async () => {
    const repository = new ClientRepository()
    const addClientUseCase = new AddClientUseCase(repository)
    const findClientUseCase = new FindClientUseCase(repository)
    const clientAdmFacade = new ClientAdmFacade(addClientUseCase, findClientUseCase)

    await ClientModel.create({
      id: '11',
      name: 'Fulano',
      email: 'email@mail.com',
      address: 'Address',
      updatedAt: new Date(),
      createdAt: new Date()
    })

    const client = await clientAdmFacade.find({ id: '11' })
    
    expect(client).toBeDefined()

    expect(client.id).toBe('11')
    expect(client.name).toBe('Fulano')
    expect(client.email).toBe('email@mail.com')
    expect(client.address).toBe('Address')
  })
})