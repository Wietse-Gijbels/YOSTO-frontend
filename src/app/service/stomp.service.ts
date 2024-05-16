import {Injectable} from "@angular/core";
import SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  socket = new SockJS('http://localhost:8080/ws');
  stompClient = Stomp.over(this.socket);

  subscribe(callback: any): void {
    const connected: boolean = this.stompClient.connected;
    if (connected) {
      this.stompClient.subscribe('/chat', callback);
    } else {
      this.stompClient.connect({}, () => {
        this.stompClient.subscribe('/chat', callback);
      });
    }
  }

  send(message: string): void {
    this.stompClient.send('/chat', {}, message);
  }
}
