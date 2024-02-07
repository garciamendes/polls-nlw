import { Prisma } from '@prisma/client'

export interface ICreatePollAndCreateOptions extends Omit<Prisma.PollCreateInput, 'options'> {
  options: Array<string>
}

export interface IParansGetDetailPoll {
  pollId: string
}

export interface ICreateVote extends Omit<Prisma.VoteUncheckedCreateInput, 'id' | 'created'> {}