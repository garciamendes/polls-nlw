import { prisma } from "@/lib/prisma";
import { ICreateVote } from "../types";
import { IVoteOnPollRepository } from "../vote-on-poll-repository";

export class PrismaVoteOnPoll implements IVoteOnPollRepository {
  async voteOnPoll({ optionsPollId, pollId, sessionId }: ICreateVote) {
    await prisma.vote.create({
      data: {
        sessionId, optionsPollId, pollId
      }
    })
  }
}