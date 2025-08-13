import { subServer } from '../libs/redis'
import { REGION } from '../constants/constants';

export interface RedisForwardConfig {
  channels: string[]
}

export default class MessageBroker {
  /**
   * Syncs events across all server regions.
   * 
   * @assume messages are then forwarded to clients.   
   */
  static async enableServerSync(config: RedisForwardConfig) {
    const { channels } = config;

    await Promise.all([
      channels.map((channel) => {
        return subServer.subscribe(channel, (error, count) => {
          (error) 
            ? console.error(`[${REGION}] Failed to subscribe: `, error) 
            : console.log(`[${REGION}] server subscribed to ${count} channel(s).`)
        })
      })
    ])
  }
}