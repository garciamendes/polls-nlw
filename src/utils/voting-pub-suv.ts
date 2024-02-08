type message = { pollOptionId: string, votes: number}

type Subscriber = (mesage: message) => void

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {}

  subscribe(pollId: string, subscriber: Subscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = []
    }

    this.channels[pollId].push(subscriber)
  }

  publish(pollId: string, message: message) {
    if (!this.channels[pollId]) {
      return
    }

    for (const sub of this.channels[pollId]) {
      sub(message)
    }
  }
}

export const voting = new VotingPubSub()