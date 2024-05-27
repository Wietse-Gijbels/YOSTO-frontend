import { Injectable } from '@angular/core';
import { GebruikerInterface, Message } from '../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  getMessages(senderId: string, receiverId: string): Observable<Message[]> {
    return this.http.get<Message[]>(
      `http://localhost:8080/messages/${senderId}/${receiverId}`,
    );
  }

  getMyChatRooms(userId: string): Observable<GebruikerInterface[]> {
    return this.http.get<GebruikerInterface[]>(
      `http://localhost:8080/api/v1/chatroom/getMyChatRooms/${userId}`,
    );
  }
}
