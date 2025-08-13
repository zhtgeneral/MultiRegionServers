import { PORT, REGION } from './constants/constants';
import { server } from './libs/app';
import { io } from './libs/socket';

import MultiRegionServer from './services/Server';

const multiRegionServer = new MultiRegionServer();

io.on('connection', (socket) => {
  console.log(`[${REGION}] Client connected: ${socket.id}`); 

  socket.on('message', async (msg) => { 
    await multiRegionServer.send(REGION, msg); 
  });

  socket.on('disconnect', () => {
    console.log(`[${REGION}] Client disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`${REGION} server listening on port ${PORT}`);
});