import { FindDetailpollUseCase } from "../find-detail-poll"
import { PrismaPollsRepository } from "@/repositories/prisma/prisma-poll-repository"

export const makeFindDetailPollUseCase = () => {
  const pollRepository = new PrismaPollsRepository()
  const findDetailPollUseCase = new FindDetailpollUseCase(pollRepository)

  return findDetailPollUseCase
}