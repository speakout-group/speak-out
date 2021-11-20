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
import { SponsorsService } from '../service/sponsors.service';

@UsePipes(new ValidationPipe())
@UseFilters(new ExceptionsFilter())
@UseGuards(JwtAuthGuard)
@WebSocketGateway()
export class SponsorsGateway implements OnGatewayDisconnect<Socket> {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => SponsorsService)) private sponsorsService: SponsorsService
  ) {}

  handleDisconnect(socket: Socket) {
    this.sponsorsService.unsubscribeSocket(socket);
  }

  @SubscribeMessage('sponsor:subscribe')
  async subscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() sponsorId: string
  ) {
    return this.sponsorsService.subscribeSocket(
      client,
      await this.sponsorsService.validateSponsorById(sponsorId)
    );
  }
}
