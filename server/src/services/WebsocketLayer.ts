import { subServer } from '../libs/redis';
import { REGION } from "../constants/constants";
import { io } from '../libs/socket'

export default class Websocket {
  /**
   * Forwards any events from server to client.
   * 
   * @requires MessageBroker has enabled server sync.
   */
  static enableForwarding() {
    subServer.on('message', (channel, message) => {
      Websocket.forwardToClient(channel, message);
    });
  }

  private static forwardToClient(channel: string, message: string) {
    io.emit('broadcast', message);
    console.log(`[${REGION}] Received message on ${channel}: ${message}`);
  }
}