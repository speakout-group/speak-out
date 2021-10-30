import {
  forwardRef,
  Inject,
  UseFilters,
  UseGuards,
  UsePipes,
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
import { ConfService } from '../service/conf.service';

@UsePipes(new ValidationPipe())
@UseFilters(new ExceptionsFilter())
@UseGuards(JwtAuthGuard)
@WebSocketGateway()
export class ConfGateway implements OnGatewayDisconnect<Socket> {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => ConfService)) private confService: ConfService
  ) {}

  handleDisconnect(socket: Socket) {
    this.confService.unsubscribeSocket(socket);
  }

  @SubscribeMessage('conf:subscribe')
  async subscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() confId: string
  ) {
    return this.confService.subscribeSocket(
      client,
      await this.confService.validateConf(confId)
    );
  }
}
