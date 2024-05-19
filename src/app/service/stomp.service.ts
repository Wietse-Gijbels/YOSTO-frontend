import { Injectable } from '@angular/core';
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  socket = new SockJS('http://localhost:8080/ws');
  stompClient = Stomp.over(this.socket);

  connect(callback: any, errorCallback: any): void {
    this.stompClient.connect({}, callback, errorCallback);
  }

  subscribe(options: string, callback: any): void {
    this.stompClient.subscribe(options, callback);
  }

  send(options: string, value: any): void {
    this.stompClient.send(options, {}, value);
  }
}
