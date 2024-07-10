import { io } from 'socket.io-client'

const URL =
  import.meta.env.VITE_BASE_URL + '/graphql' || 'http://localhost:3000'

export const socket = io(URL)
