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
    @MessageBody() room: string,
  ) {
    client.join(room);
    client.emit('joinedRoom', room);

    client.to(room).emit('userJoined');
  }

  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.leave(room);
    client.emit('leftRoom', room);

    client.to(room).emit('userLeft');
  }

  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { room: string; message: string; username: string },
  ) {
    const messagePayload = {
      message: data.message,
      username: data.username,
    };
    this.server.to(data.room).emit('message', messagePayload);
  }
}
