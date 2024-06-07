import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatRoomInterface, Message } from '../models/interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  token: string = this.cookieService.get('token');
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  getMessages(chatId: string): Observable<Message[]> {
    return this.http.get<Message[]>(`http://localhost:8080/messages/${chatId}`);
  }

  getMyChatRooms(userId: string): Observable<ChatRoomInterface[]> {
    return this.http.get<ChatRoomInterface[]>(
      `http://localhost:8080/api/v1/chatroom/getMyChatRooms/${userId}`,
    );
  }

  getChatRoom(chatId: string): Observable<ChatRoomInterface> {
    return this.http.get<ChatRoomInterface>(
      `http://localhost:8080/api/v1/chatroom/getChatRoom/${chatId}`,
    );
  }

  sluitChatRoom(chatId: string): Observable<void> {
    return this.http.post<void>(
      'http://localhost:8080/api/v1/chatroom/sluitChat',
      { chatId },
      { headers: this.headers },
    );
  }
}
