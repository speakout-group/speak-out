import {
  Body,
  Get,
  Param,
  Delete,
  UseGuards,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';
import { Query } from '@nestjs/common';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { RoomService } from '../../room/service/room.service';
import { UserService } from '../../user/service/user.service';
import { MessageService } from '../service/message.service';
import { User } from '../../user/schema/user.schema';
import {
  DeleteDirectMessageDto,
  DeleteRoomMessageDto,
  FetchMessagesDto
} from '../dto';

@UseGuards(JwtAuthGuard)
@Controller('message')
export class MessageController {
  constructor(
    private userService: UserService,
    private roomService: RoomService,
    private messageService: MessageService,
  ) {}

  @Get('direct-first-message/:userId')
  async getFirstDirectMessage(
    @CurrentUser() user: User,
    @Param('userId') to: string,
  ) {
    return this.messageService.getFirstDirectMessage(
      user,
      await this.userService.validateUserById(to),
    );
  }

  @Get('direct/:userId')
  async getDirectMessages(
    @CurrentUser() user: User,
    @Param('userId') to: string,
    @Query() query: FetchMessagesDto,
  ) {
    return this.messageService.getDirectMessages(
      user,
      await this.userService.validateUserById(to),
      query.limit,
      query.before,
    );
  }

  @Delete('direct')
  async deleteDirectMessage(
    @Body() body: DeleteDirectMessageDto,
    @CurrentUser() from: User,
  ) {
    await this.userService.validateUserById(body.to);

    const message = await this.messageService.validatePopulatedMessage(
      body.messageId,
    );

    if (message.from.id !== from.id && message.to.id !== from.id) {
      throw new UnauthorizedException('Você não tem acesso a este chat');
    }

    return this.messageService.deleteDirectMessage(message);
  }

  @Delete('direct/all')
  async deleteDirectMessages(
    @Body() body: DeleteDirectMessageDto,
    @CurrentUser() from: User,
  ) {
    const to = await this.userService.validateUserById(body.to);

    return this.messageService.deleteDirectMessages(from, to);
  }

  @Get('room-first-message/:roomId')
  async getFirstRoomMessage(@Param('roomId') roomId: string) {
    return this.messageService.getFirstRoomMessage(
      await this.roomService.validateRoom(roomId),
    );
  }

  @Get('room/:roomId')
  async getRoomMessages(
    @Param('roomId') roomId: string,
    @Query() query: FetchMessagesDto,
  ) {
    return this.messageService.getRoomMessages(
      await this.roomService.validateRoom(roomId),
      query.limit,
      query.before,
    );
  }

  @Delete('room')
  async deleteRoomMessage(
    @Body() body: DeleteRoomMessageDto,
    @CurrentUser() user: User,
  ) {
    const room = await this.roomService.validateRoom(body.roomId);

    const message = await this.messageService.validateMessage(body.messageId);

    if (room.owner.id !== user.id && message.from.id !== user.id) {
      throw new UnauthorizedException('Você não é o dono da mensagem');
    }

    return this.messageService.deleteRoomMessage(room, body.messageId);
  }

  @Delete('room/all')
  async deleteRoomMessages(
    @Body() body: DeleteRoomMessageDto,
    @CurrentUser() user: User,
  ) {
    const room = await this.roomService.validateRoom(body.roomId);

    if (user.id !== room.owner.id) {
      throw new UnauthorizedException('Você não é o dono da sala');
    }

    return this.messageService.deleteRoomMessages(room);
  }
}
