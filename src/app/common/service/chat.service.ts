import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatRoomInterface, Message } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  getMessages(chatId: string): Observable<Message[]> {
    return this.http.get<Message[]>(
      `http://localhost:8080/messages/${chatId}`,
    );
  }

  getMyChatRooms(userId: string): Observable<ChatRoomInterface[]> {
    return this.http.get<ChatRoomInterface[]>(
      `http://localhost:8080/api/v1/chatroom/getMyChatRooms/${userId}`,
    );
  }
}
