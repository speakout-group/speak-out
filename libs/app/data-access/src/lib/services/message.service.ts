import { User, Room, MessageType, Message } from '../interfaces';
import { AppConfig, APP_CONFIG } from '../app-data-access.config';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthTokenInterceptor } from '../interceptors';
import { Inject, Injectable } from '@angular/core';
import { SocketService } from './socket.service';

export interface TypingResponse {
  room?: Room;
  user: User;
}

export interface FilterParams {
  limit: number;
  before?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(
    private socket: SocketService,
    private http: HttpClient,
    @Inject(APP_CONFIG)
    private appConfig: AppConfig
  ) {}

  getMessages(type: MessageType, id: string, limit: number, before = '') {
    const filter: FilterParams = { limit, before };

    for (const key of Object.keys(filter)) {
      const k = key as keyof FilterParams;
      if (!filter[k]) delete filter[k];
    }

    const params = new HttpParams({
      fromObject: { ...filter },
    });

    return this.http.get<Message[]>(
      `${this.appConfig.api}/message/${type}/${id}`,
      { params }
    );
  }

  getFirstMessage(type: MessageType, id: string) {
    return this.http.get<Message>(
      `${this.appConfig.api}/message/${type}-first-message/${id}`
    );
  }

  onMessage(type: MessageType) {
    return this.socket.fromEvent<Message>(`message:${type}`);
  }

  sendMessage<T>(
    type: MessageType,
    id: string,
    message: string,
    callback?: (data: T) => void
  ) {
    return this.socket.emit(
      `message:${type}`,
      {
        to: id,
        roomId: id,
        message,
      },
      callback
    );
  }

  sendTyping(type: MessageType, id: string) {
    return this.socket.emit(`message:${type}:typing`, id);
  }

  deleteMessage(type: MessageType, message: Message) {
    return this.http.delete<Message>(`${this.appConfig.api}/message/${type}`, {
      body: {
        messageId: message._id,
        roomId: message.room,
        to: message.to,
      },
      headers: {
        [AuthTokenInterceptor.skipHeader]: 'true',
      },
    });
  }

  onDeleteMessagesEvent(type: MessageType) {
    return this.socket.fromEvent<string>(`${type}:delete_messages`);
  }

  onDeleteMessageEvent(type: MessageType) {
    return this.socket.fromEvent<string>(`${type}:delete_message`);
  }

  onTyping(type: MessageType, id: string) {
    return this.socket.fromEvent<TypingResponse>(`message:${type}:typing`);
  }
}
