import { Connection, Channel, connect, Replies } from 'amqplib'
import { ENVIRONMENT } from '@/main/config'

export default class RabbitmqService {
  private static instance: RabbitmqService
  private conn!: Connection
  private channel!: Channel

  static getInstance (): RabbitmqService {
    if (!RabbitmqService.instance) {
      RabbitmqService.instance = new RabbitmqService()
    }
    return RabbitmqService.instance
  }

  async start (): Promise<void> {
    const { user, password, host, port } = ENVIRONMENT.rabbit
    if (user && password && host && port) {
      this.conn = await connect(
        `amqp://${user}:${password}@${host}:${port}`
      )
      this.channel = await this.conn.createChannel()
    }
  }

  async publishInQueue (queue: string, message: string): Promise<Boolean> {
    console.log('publishInQueue in', queue)
    return this.channel.sendToQueue(queue, Buffer.from(message))
  }

  async publishInExchange (
    exchange: string,
    routingKey: string,
    message: string
  ): Promise<boolean> {
    return this.channel.publish(exchange, routingKey, Buffer.from(message))
  }

  async consume (queue: string, callback: any): Promise<Replies.Consume> {
    return await this.channel.consume(queue, callback, { noAck: true })
  }
}
