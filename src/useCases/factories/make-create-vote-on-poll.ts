import { PrismaVoteOnPoll } from "@/repositories/prisma/prisma-vote-on-poll-repository"
import { VoteOnPollUseCase } from "../create-vote-on-poll"

export const makeVoteOnPollUseCase = () => {
  const voteOnPollRepository = new PrismaVoteOnPoll()
  const voteOnPollUseCase = new VoteOnPollUseCase(voteOnPollRepository)

  return voteOnPollUseCase
}