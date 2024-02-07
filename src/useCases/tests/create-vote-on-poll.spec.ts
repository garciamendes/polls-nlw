import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryVoteOnPollRepository } from '../../repositories/in-memory/in-memory-vote-on-poll-repository'
import { VoteOnPollUseCase } from '../create-vote-on-poll'
import { InMemoryPollRepository } from '../../repositories/in-memory/in-memory-poll-repository'

let voteRepository: InMemoryVoteOnPollRepository
let sut: VoteOnPollUseCase

describe('Criação de votos', () => {
  beforeEach(async () => {
    voteRepository = new InMemoryVoteOnPollRepository()
    sut = new VoteOnPollUseCase(voteRepository)
  })

  it('Deve ser possível criar/votar em uma opção de uma enquete', async () => {
    const pollRepository = new InMemoryPollRepository()
    const poll = await pollRepository.create({
      title: 'Teste 1',
      options: ['Teste 1', 'Teste 2']
    })
    const fisrtPollOption = pollRepository.itemOptions?.[0]

    await sut.execute({
      optionsPollId: fisrtPollOption.id,
      pollId: poll.id,
      sessionId: 'teste_dev_hash'
    })

    const vote = voteRepository.items.find(item => item.optionsPollId === fisrtPollOption.id && item.pollId === poll.id)
    expect(vote).toEqual(expect.objectContaining({
      pollId: poll.id,
      optionsPollId: fisrtPollOption.id,
      sessionId: 'teste_dev_hash'
    }))
  })
})