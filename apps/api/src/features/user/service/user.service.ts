import {
  Inject,
  forwardRef,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { randomString } from '../../../shared/utils/random-string';
import { SocketConnectionService } from './socket-connection.service';
import { UserGateway } from '../gateway/user.gateway';
import { User } from '../schema/user.schema';
import { ObjectId } from 'mongodb';
import { Socket } from 'socket.io';

@Injectable()
export class UserService {
  private blockedFields: (keyof User)[] = [
    'password',
    'sessionToken',
    'email',
    'facebookId',
    'googleId',
    'appleId',
  ];

  unpopulatedFields = '-' + this.blockedFields.join(' -');

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => UserGateway)) private userGateway: UserGateway,
    private socketConnectionService: SocketConnectionService
  ) {}

  getUserByName(name: string) {
    const username = { $regex: new RegExp(`^${name}$`, 'i') };

    return this.userModel.findOne({ username });
  }

  async validateUserByName(username: string) {
    const user = await this.getUserByName(username);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  getUserByEmail(mail: string) {
    const email = { $regex: new RegExp(`^${mail}$`, 'i') };

    return this.userModel.findOne({ email });
  }

  async validateUserByEmail(email: string) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  getUserBy(filter: FilterQuery<User>) {
    return this.userModel.findOne(filter);
  }

  getUserByGoogleId(id: string) {
    return this.userModel.findOne({ googleId: id });
  }

  getUserById(id: ObjectId | string) {
    return this.userModel.findById(id);
  }

  async validateUserById(id: string) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    return user;
  }

  getOnlineUsers() {
    return this.userModel.find({ online: true });
  }

  async subscribeSocket(socket: Socket, user: User) {
    await this.socketConnectionService.create(socket, user);

    return socket.join(`user_${user._id}`);
  }

  async unsubscribeSocket(socket: Socket, user: User) {
    await this.socketConnectionService.delete(socket);

    return socket.leave(`user_${user._id}`);
  }

  sendMessage<T>(user: User, event: string, message?: T) {
    return this.userGateway.server.to(`user_${user._id}`).emit(event, message);
  }

  sendMessageExcept<T>(except: Socket, user: User, event: string, message: T) {
    return except.broadcast.to(`user_${user._id}`).emit(event, message);
  }

  async generateUsername(base: string) {
    const name = base.replace(/\s/g, '');

    if (!(await this.getUserByName(name))) {
      return name;
    }

    return this.generateUsername(name + randomString(6));
  }

  async getUser(username: string) {
    return (
      (await this.getUserByName(username)) ??
      (await this.getUserByEmail(username))
    );
  }

  updateUser(user: User, data: UpdateQuery<User>) {
    return this.userModel.findByIdAndUpdate(user._id, data);
  }

  filterUser(user: User, allowedFields: (keyof User)[] = []) {
    const userObject = user.toObject({ virtuals: true });

    for (const field of this.blockedFields) {
      if (allowedFields.includes(field)) {
        continue;
      }

      delete userObject[field];
    }

    return userObject;
  }

  async updateUserObject(user: User) {
    const newInput = await this.getUserById(user._id);

    return Object.assign(user, newInput);
  }

  async create(body: Partial<User>) {
    const user = await this.userModel.create(body);

    user.generateSessionToken();

    return user.save();
  }
}
