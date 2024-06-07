import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ChatRoomInterface,
  GebruikerInterface,
  Message,
} from '../models/interfaces';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private url = environment.url + '/chatroom';
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
      this.url + `/getMyChatRooms/${userId}`,
    );
  }

  getChatRoom(chatId: string): Observable<ChatRoomInterface> {
    return this.http.get<ChatRoomInterface>(
      this.url + `/getChatRoom/${chatId}`,
    );
  }

  sluitChatRoom(chatId: string): Observable<void> {
    return this.http.post<void>(
      this.url + '/sluitChat',
      { chatId },
      { headers: this.headers },
    );
  }
}
