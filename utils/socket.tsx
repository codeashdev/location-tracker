import { io } from "socket.io-client";

const socket = io('http://192.168.1.24:4000', {transports: ['websocket']}); 

export default socket;