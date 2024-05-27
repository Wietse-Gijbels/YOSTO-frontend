import { Injectable } from '@angular/core';
import { Client, IFrame, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class StompService {
  private stompClient: Client;

  constructor() {
    this.stompClient = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
    });
  }

  connect(callback: () => void, errorCallback: (frame: IFrame) => void): void {
    this.stompClient.onConnect = callback;
    this.stompClient.onStompError = (frame: IFrame) => {
      // Handle the error frame here
      console.error(`Broker reported error: ${frame.headers['message']}`);
      console.error(`Additional details: ${frame.body}`);
      errorCallback(frame);
    };
    this.stompClient.activate();
  }

  subscribe(destination: string, callback: (message: Message) => void): void {
    this.stompClient.subscribe(destination, callback);
  }

  send(destination: string, body: any): void {
    this.stompClient.publish({
      destination: destination,
      body: body,
    });
  }
}
