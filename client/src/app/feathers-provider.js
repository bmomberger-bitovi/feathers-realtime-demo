"use client"
import { Provider } from 'figbird';
import io from 'socket.io-client'
import feathersIo from '@feathersjs/socketio-client';
import { createClient } from 'feathers-realtime-react-demo/src/client';

const socket = io('http://localhost:3030')
const feathersSocket = feathersIo(socket);
const client = createClient(feathersSocket);

export const FeathersProvider = ({ children }) => (
  <Provider feathers={client}>{children}</Provider>
);