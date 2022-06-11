import io from 'socket.io-client';

// const baseURL = process.env.REACT_APP_API || "http://localhost:3001";
let socketServer = io(process.env.REACT_APP_API || "http://localhost:3001");

export default socketServer;

