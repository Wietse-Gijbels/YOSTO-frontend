import { Component, OnInit } from '@angular/core';
import { MatList, MatListItem } from '@angular/material/list';
import { MatLine } from '@angular/material/core';
import { GebruikerService } from '../service/gebruiker.service';
import { GebruikerInterface, Message } from '../models/interfaces';
import { MatButton } from '@angular/material/button';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatGridList } from '@angular/material/grid-list';
import { StompService } from '../service/stomp.service';
import { ChatService } from '../service/chat.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatList,
    MatListItem,
    MatLine,
    MatButton,
    MatFormField,
    MatInput,
    MatGridList,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  gebruikers: GebruikerInterface[] = [];
  selectedGebruiker?: GebruikerInterface;
  messageForm!: FormGroup;
  private berichtenSubject = new BehaviorSubject<Message[]>([]);
  berichten$ = this.berichtenSubject.asObservable();

  constructor(
    private gebruikerService: GebruikerService,
    private stompService: StompService,
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.gebruikerService.getAllConectedGebruikers().subscribe(
      (gebruikers) => {
        this.gebruikers = gebruikers;
      },
      (error) => {
        console.error('Error fetching gebruikers:', error);
      },
    );

    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required],
    });

    this.stompService.connect(
      () => this.onConnected(),
      (error: Error) => {
        console.error('Error connecting to websocket:', error);
      },
    );
  }

  onChatClick(gebruiker: GebruikerInterface): void {
    this.selectedGebruiker = gebruiker;

    this.chatService
      .getMessages(this.cookieService.get('token')!, gebruiker.id)
      .subscribe(
        (messages) => {
          this.berichtenSubject.next(messages);
        },
        (error) => {
          console.error('Error fetching messages:', error);
        },
      );
  }

  onConnected(): void {
    setTimeout(() => {
      this.stompService.subscribe(
        `/user/${this.cookieService.get('token')}/queue/messages`,
        this.onMessageReceived,
      );
      this.stompService.subscribe(`/user/public`, this.onMessageReceived);
    }, 500);
  }

  onSubmit() {
    if (this.messageForm.valid) {
      const messageContent = this.messageForm.value.message;

      const chatMessage: Message = {
        senderId: this.cookieService.get('token')!,
        recipientId: this.selectedGebruiker?.id ?? '',
        content: messageContent,
        timestamp: new Date(),
      };

      this.stompService.send('/app/chat', JSON.stringify(chatMessage));

      this.messageForm.reset();

      if (this.selectedGebruiker) {
        this.berichtenSubject.next([
          ...this.berichtenSubject.value,
          chatMessage,
        ]);
      }
    }
  }

  onMessageReceived = (payload: any): void => {
    const message = JSON.parse(payload.body);
    console.log('Message received:', message);

    if (
      this.selectedGebruiker &&
      message.senderId === this.selectedGebruiker.id
    ) {
      this.berichtenSubject.next([...this.berichtenSubject.value, message]);
    }
  };
}
