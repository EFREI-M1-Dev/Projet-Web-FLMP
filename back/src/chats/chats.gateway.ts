import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL,
  },
})
export class ChatsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; username: string },
  ) {
    client.join(data.room);
    client.emit('joinedRoom', data.room);
    console.log(`Client ${client.id} joined room ${data.room}`);

    client
      .to(data.room)
      .emit('userJoined', { room: data.room, username: data.username });
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; username: string },
  ) {
    client.leave(data.room);
    client.emit('leftRoom', data.room);
    console.log(`Client ${client.id} left room ${data.room}`);

    client
      .to(data.room)
      .emit('userLeft', { room: data.room, username: data.username });
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; message: string; username: string },
  ) {
    const messagePayload = {
      room: data.room,
      message: data.message,
      username: data.username,
    };
    this.server.to(data.room).emit('message', messagePayload);
  }
}
