import { pubServer } from '../libs/redis'
import MessageBroker from './MessageBrokerLayer';
import Websocket from './WebsocketLayer';

/**
 * Create a server for a particular region.
 * 
 * @requires process.env has correct variables. For reference, check /src/constants/constants.ts
 */
export default class MultiRegionServer {
  private hasEnabledSync = false;

  /**
   * Enable sync/forwarding before broadcasting message to other servers.
   */
  async send(region: string, msg: string) {
    if (!this.hasEnabledSync) {
      await this.enableSyncAndForwarding();
    }    

    await pubServer.publish('global_channel', `[From ${region}] ${msg}`);
  }

  private async enableSyncAndForwarding() {
    await MessageBroker.enableServerSync({ 
      channels: ['global_channel'] 
    });

    Websocket.enableForwarding();

    this.hasEnabledSync = true;
  }
}