import {
  Inject,
  UsePipes,
  UseGuards,
  UseFilters,
  forwardRef,
  ValidationPipe,
} from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ExceptionsFilter } from '../../../core/filter/exceptions.filter';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { TalksService } from '../service/talks.service';

@UsePipes(new ValidationPipe())
@UseFilters(new ExceptionsFilter())
@UseGuards(JwtAuthGuard)
@WebSocketGateway()
export class TalksGateway implements OnGatewayDisconnect<Socket> {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => TalksService)) private talksService: TalksService
  ) {}

  handleDisconnect(socket: Socket) {
    this.talksService.unsubscribeSocket(socket);
  }

  @SubscribeMessage('talks:subscribe')
  async subscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() talkId: string
  ) {
    return this.talksService.subscribeSocket(
      client,
      await this.talksService.validateTalkById(talkId)
    );
  }
}
