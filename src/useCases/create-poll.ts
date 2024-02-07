import { IPollRepository } from '@/repositories/poll-repository'
import { ICreatePollAndCreateOptions } from '@/repositories/types'

export class CreatePollUseCase {
  constructor(private pollRepository: IPollRepository) {}

  async execute(data: ICreatePollAndCreateOptions) {
    const poll = await this.pollRepository.create(data)

    return poll
  }
}