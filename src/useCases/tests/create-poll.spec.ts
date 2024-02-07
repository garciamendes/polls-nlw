import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePollUseCase } from '../create-poll'
import { InMemoryPollRepository } from '../../repositories/in-memory/in-memory-poll-repository'

let pollRepository: InMemoryPollRepository
let sut: CreatePollUseCase

describe('Criação de uma nova enquete e sua opções', () => {
  beforeEach(async () => {
    pollRepository = new InMemoryPollRepository()
    sut = new CreatePollUseCase(pollRepository)
  })

  it('Deve ser possível criar uma enquete e suas opções', async () => {
    const poll = await sut.execute({
      title: 'Teste enquete',
      options: ['Teste_1', 'Teste_2', 'Teste_3']
    })

    expect(poll.id).toEqual(expect.any(String))
  })
})