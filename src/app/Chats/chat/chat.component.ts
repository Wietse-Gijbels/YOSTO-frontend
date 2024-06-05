import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { IFrame } from '@stomp/stompjs';
import {
  GebruikerInterface,
  Message,
  StudierichtingInterface,
} from '../../common/models/interfaces';
import { StompService } from '../../common/service/stomp.service';
import { GebruikerService } from '../../common/service/gebruiker.service';
import { ChatService } from '../../common/service/chat.service';
import { StudierichtingService } from '../../common/service/studierichting.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackPopupComponent } from '../feedback-popup/feedback-popup.component';

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
export class ChatComponent implements OnInit, AfterViewChecked {
  gebruikers: GebruikerInterface[] = [];
  selectedGebruiker?: GebruikerInterface;
  messageForm!: FormGroup;
  userId: string = '';
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  private berichtenSubject = new BehaviorSubject<Message[]>([]);
  berichten$ = this.berichtenSubject.asObservable();
  studieRichting: StudierichtingInterface | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gebruikerService: GebruikerService,
    private stompService: StompService,
    private chatService: ChatService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private studierichtingService: StudierichtingService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.gebruikerService
      .getGebruikerIdByToken(this.cookieService.get('token'))
      .subscribe((userId) => {
        this.userId = userId;
        this.stompService.connect(
          () => this.onConnected(),
          (error: IFrame) => {
            console.error('Error connecting to websocket:', error);
          },
        );
        if (this.userId === this.route.snapshot.params['id'].split('_')[0]) {
          this.gebruikerService
            .getGebruikerById(this.route.snapshot.params['id'].split('_')[1])
            .subscribe(
              (gebruiker: any) => {
                this.selectedGebruiker = gebruiker;
                // console.log('Selected gebruiker:', this.selectedGebruiker);
                this.loadMessages();
              },
              (error: any) => {
                console.error('Error fetching gebruiker:', error);
              },
            );
        } else {
          this.gebruikerService
            .getGebruikerById(this.route.snapshot.params['id'].split('_')[0])
            .subscribe(
              (gebruiker: any) => {
                this.selectedGebruiker = gebruiker;
                // console.log('Selected gebruiker:', this.selectedGebruiker);
                this.loadMessages();
              },
              (error: any) => {
                console.error('Error fetching gebruiker:', error);
              },
            );
        }
      });
    this.setRichtingDetails();
    this.messageForm = this.formBuilder.group({
      message: [''],
    });
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  setRichtingDetails(): void {
    this.studierichtingService
      .findStudierichting(this.route.snapshot.params['id'].split('_')[2])
      .subscribe((studierichting: StudierichtingInterface) => {
        this.studieRichting = studierichting;
        // console.log('Studierichting:', this.studieRichting);
      });
  }

  scrollToBottom(): void {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom error:', err);
    }
  }

  loadMessages(): void {
    if (this.selectedGebruiker) {
      this.chatService.getMessages(this.route.snapshot.params['id']).subscribe(
        (messages: string | any[]) => {
          // console.log('Messages:', messages);
          const convertedMessages: Message[] = messages as Message[];
          this.berichtenSubject.next(convertedMessages);
          if (convertedMessages.length > 0) {
            this.selectedGebruiker!.lastMessage =
              convertedMessages[convertedMessages.length - 1].content;
          }
        },
        (error: any) => {
          console.error('Error fetching messages:', error);
        },
      );
    }
  }

  isMessageFieldEmpty(): boolean {
    const messageControl = this.messageForm.get('message') as FormControl;
    return !messageControl.value || messageControl.value.trim() === '';
  }

  onSubmit() {
    if (this.messageForm.valid) {
      const messageContent = this.messageForm.value.message;

      if (this.userId !== '') {
        const chatMessage: Message = {
          senderId: this.userId,
          recipientId: this.selectedGebruiker?.id ?? '',
          studierichtingId: this.route.snapshot.params['id'].split('_')[2],
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
    message.timestamp = new Date(message.timestamp);
    // console.log('Message received:', message);

    if (
      this.selectedGebruiker &&
      message.senderId === this.selectedGebruiker.id
    ) {
      this.berichtenSubject.next([...this.berichtenSubject.value, message]);
      this.selectedGebruiker.lastMessage = message.content;
    } else {
      const sender = this.gebruikers.find(
        (gebruiker) => gebruiker.id === message.senderId,
      );
      if (sender) {
        sender.newMessageCount = (sender.newMessageCount || 0) + 1;
        sender.lastMessage = message.content;
      }
    }
  };

  onConnected(): void {
    setTimeout(() => {
      this.stompService.subscribe(
        `/user/${this.userId}/queue/messages`,
        this.onMessageReceived,
      );
      this.stompService.subscribe(`/user/public`, this.onMessageReceived);
      this.loadMessages();
    }, 500);
  }

  goBack(): void {
    const dialogRef = this.dialog.open(FeedbackPopupComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Navigate back to chat list if popup is closed
      if (result !== 'submitFeedback') {
        this.router.navigate(['/chat']);
      }
    });
  }

  stringToColor(email: string): string {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 75%, 60%)`;
    return color;
  }
}
