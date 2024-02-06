import { Poll, Prisma } from '@prisma/client'

export interface IPollRepository {
  create: (data: Prisma.PollCreateInput) => Promise<Poll>
}