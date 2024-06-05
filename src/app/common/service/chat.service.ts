import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GebruikerInterface, Message } from '../models/interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private http: HttpClient) {}

  getMessages(senderId: string, receiverId: string): Observable<Message[]> {
    return this.http.get<Message[]>(
      environment.url + `/messages/${senderId}/${receiverId}`,
    );
  }

  getMyChatRooms(userId: string): Observable<GebruikerInterface[]> {
    return this.http.get<GebruikerInterface[]>(
      environment.url + `/chatroom/getMyChatRooms/${userId}`,
    );
  }
}
