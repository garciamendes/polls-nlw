import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePollUseCase } from '../create-poll'
import { InMemoryPollRepository } from '../../repositories/in-memory/in-memory-poll-repository'

let pollRepository: InMemoryPollRepository
let sut: CreatePollUseCase

describe('Criação de uma nova enquete', () => {
  beforeEach(async () => {
    pollRepository = new InMemoryPollRepository()
    sut = new CreatePollUseCase(pollRepository)
  })

  it('Deve ser possível criar uma enquete', async () => {
    const poll = await sut.execute({
      title: 'Teste enquete'
    })

    expect(poll.id).toEqual(expect.any(String))
  })
})