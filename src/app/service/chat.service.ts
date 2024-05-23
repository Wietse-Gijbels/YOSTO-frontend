import { Injectable } from '@angular/core';
import { Message } from '../models/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  getMessages(senderId: string, receiverId: string): Observable<Message[]> {
    return this.http.get<Message[]>(
      `http://localhost:8080/messages/${senderId}/${receiverId}`,
      { headers: this.headers },
    );
  }
}
