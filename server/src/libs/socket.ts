import { Server } from 'socket.io';
import { server } from './app' ;

export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ["GET", "POST"]
  },
});