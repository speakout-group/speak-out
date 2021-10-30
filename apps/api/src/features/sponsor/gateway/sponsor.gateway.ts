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
import { SponsorService } from '../service/sponsor.service';

@UsePipes(new ValidationPipe())
@UseFilters(new ExceptionsFilter())
@UseGuards(JwtAuthGuard)
@WebSocketGateway()
export class SponsorGateway implements OnGatewayDisconnect<Socket> {
  @WebSocketServer() server: Server;

  constructor(
    @Inject(forwardRef(() => SponsorService)) private sponsorService: SponsorService
  ) {}

  handleDisconnect(socket: Socket) {
    this.sponsorService.unsubscribeSocket(socket);
  }

  @SubscribeMessage('sponsor:subscribe')
  async subscribe(
    @ConnectedSocket() client: Socket,
    @MessageBody() sponsorId: string
  ) {
    return this.sponsorService.subscribeSocket(
      client,
      await this.sponsorService.validateSponsor(sponsorId)
    );
  }
}
