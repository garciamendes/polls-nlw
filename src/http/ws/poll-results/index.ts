import { voting } from "@/utils/voting-pub-suv";
import { SocketStream } from "@fastify/websocket";
import { FastifyRequest } from "fastify";
import { z } from "zod";

export const pollResults = async (connection: SocketStream, request: FastifyRequest) => {
  connection.socket.on('message', (message: string) => {
    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = voteOnPollParams.parse(request.params)

    voting.subscribe(pollId, (message) => {
      connection.socket.send(JSON.stringify(message))
    })
  })
}