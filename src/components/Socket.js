import io from 'socket.io-client';
import baseUrl from '../index'
let socketServer = io(baseUrl);

export default socketServer;

