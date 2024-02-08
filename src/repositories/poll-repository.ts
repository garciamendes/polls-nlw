import { Poll } from '@prisma/client'
import { ICreatePollAndCreateOptions, IParansGetDetailPoll } from './types'

export interface IPollRepository {
  create: (data: ICreatePollAndCreateOptions) => Promise<Poll>
  pollById: ({ pollId }: IParansGetDetailPoll) => Promise<object | null>
}