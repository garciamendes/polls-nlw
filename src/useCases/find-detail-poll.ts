import { IPollRepository } from '@/repositories/poll-repository'
import { IParansGetDetailPoll } from '@/repositories/types'

export class FindDetailpollUseCase {
  constructor(private pollRepository: IPollRepository) { }

  async execute({ pollId }: IParansGetDetailPoll) {
    const poll = await this.pollRepository.pollById({ pollId })

    return poll
  }
}