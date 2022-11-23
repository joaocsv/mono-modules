import { Sequelize } from 'sequelize-typescript'
import Id from '../../@shared/domain/value-object/id.value-object'
import ClientEntity from '../domain/client.entity'
import ClientModel from './client.model'
import ClientRepository from './client.repository'

describe('Client repository tests', () => {
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
    const client = new ClientEntity({
      id: new Id('1'),
      name: 'Jon Jones',
      email: 'jon@jones.com.br',
      address: 'Address',
    })

    const clientRepository = new ClientRepository()
    
    await clientRepository.add(client)

    const result = await ClientModel.findOne({ where: { id: client.id.id } })

    expect(result?.id).toBe(client.id.id)
    expect(result?.name).toBe(client.name)
    expect(result?.email).toBe(client.email)
    expect(result?.address).toEqual(client.address)
    expect(result?.createdAt).toEqual(client.createdAt)
  })

  test('Should find a client', async () => {
    const client = await ClientModel.create({
      id: '1',
      name: 'Jon Jones',
      email: 'jon@jones.com.br',
      address: 'Address',
      createdAt: new Date(),
      updatedAt: new Date()
    })

    const clientRepository = new ClientRepository()
    const result = await clientRepository.find('1')

    expect(result.id.id).toBe(client.id)
    expect(result.name).toBe(client.name)
    expect(result.email).toBe(client.email)
    expect(result.address).toEqual(client.address)
    expect(result.createdAt).toEqual(client.createdAt)
  })
})