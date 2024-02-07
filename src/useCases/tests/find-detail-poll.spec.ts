import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePollUseCase } from '../create-poll'
import { InMemoryPollRepository } from '../../repositories/in-memory/in-memory-poll-repository'
import { FindDetailpollUseCase } from '../find-detail-poll'

let pollRepository: InMemoryPollRepository
let sut: FindDetailpollUseCase

describe('Buscar o detail de uma enquete', () => {
  beforeEach(async () => {
    pollRepository = new InMemoryPollRepository()
    sut = new FindDetailpollUseCase(pollRepository)
  })

  it('Deve ser possível buscar o detalhe de uma enquete', async () => {
    const { id: pollId } = await pollRepository.create({
      title: 'Teste 1',
      options: ['Teste 1']
    })

    const poll = await sut.execute({ pollId })

    expect(poll).toEqual(expect.objectContaining({ title: 'Teste 1' }))
  })
})