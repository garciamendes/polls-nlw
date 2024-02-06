import { PrismaPollsRepository } from "@/repositories/prisma/prisma-poll-repository"
import { CreatePollUseCase } from "../create-poll"

export const makeCreatePollUseCase = () => {
  const pollRepository = new PrismaPollsRepository()
  const createPollUseCase = new CreatePollUseCase(pollRepository)

  return createPollUseCase
}