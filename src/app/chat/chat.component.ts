import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { GebruikerService } from '../common/service/gebruiker.service';
import { GebruikerInterface, Message } from '../common/models/interfaces';
import { StompService } from '../common/service/stomp.service';
import { ChatService } from '../common/service/chat.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatDividerModule,
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
  userId: string = '';

  constructor(
    private gebruikerService: GebruikerService,
    private stompService: StompService,
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.gebruikerService
      .getGebruikerIdByToken(this.cookieService.get('token')!)
      .subscribe(
        (userId) => {
          this.userId = userId;
          this.stompService.connect(
            () => this.onConnected(),
            (error: Error) => {
              console.error('Error connecting to websocket:', error);
            },
          );
          this.gebruikerService.getAllConectedGebruikers().subscribe(
            (gebruikers) => {
              this.gebruikers = gebruikers.filter(
                (gebruiker) => gebruiker.id !== this.userId,
              );
              // Select the first user by default if available
              if (this.gebruikers.length > 0) {
                this.onChatClick(this.gebruikers[0]);
              }
            },
            (error) => {
              console.error('Error fetching gebruikers:', error);
            },
          );
        },
        (error) => {
          console.error('Error fetching userId:', error);
        },
      );

    this.messageForm = this.formBuilder.group({
      message: [''],
    });
  }

  isMessageFieldEmpty(): boolean {
    const messageControl = this.messageForm.get('message') as FormControl;
    return !messageControl.value || messageControl.value.trim() === '';
  }

  onChatClick(gebruiker: GebruikerInterface): void {
    this.messageForm.reset();
    this.selectedGebruiker = gebruiker;

    // Reset newMessageCount property when the chat is selected
    gebruiker.newMessageCount = 0;

    this.chatService.getMessages(this.userId, gebruiker.id).subscribe(
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
        `/user/${this.userId}/queue/messages`,
        this.onMessageReceived,
      );
      this.stompService.subscribe(`/user/public`, this.onMessageReceived);
    }, 500);
  }

  onSubmit() {
    if (this.messageForm.valid) {
      const messageContent = this.messageForm.value.message;

      if (this.userId !== '') {
        const chatMessage: Message = {
          senderId: this.userId,
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
  }

  onMessageReceived = (payload: any): void => {
    const message = JSON.parse(payload.body);
    console.log('Message received:', message);

    if (
      this.selectedGebruiker &&
      message.senderId === this.selectedGebruiker.id
    ) {
      this.berichtenSubject.next([...this.berichtenSubject.value, message]);
    } else {
      const sender = this.gebruikers.find(
        (gebruiker) => gebruiker.id === message.senderId,
      );
      if (sender) {
        sender.newMessageCount = (sender.newMessageCount || 0) + 1;
      }
    }
  };
}
