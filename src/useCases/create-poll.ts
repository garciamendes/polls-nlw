import { IPollRepository } from '@/repositories/poll-repository'
import { Prisma } from '@prisma/client'

export class CreatePollUseCase {
  constructor(private pollRepository: IPollRepository) {}

  async execute(data: Prisma.PollCreateInput) {
    const poll = await this.pollRepository.create(data)

    return poll
  }
}