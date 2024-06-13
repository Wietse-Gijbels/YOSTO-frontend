import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { CookieService } from 'ngx-cookie-service';
import { MatIconModule } from '@angular/material/icon';
import { LookerQueueService } from '../../common/service/lookerQueue.service';
import {
  ChatRoomInterface,
  GebruikerRol,
} from '../../common/models/interfaces';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { GebruikerService } from '../../common/service/gebruiker.service';
import { ChatService } from '../../common/service/chat.service';
import { rolStyle } from '../../common/directives/rol-style.directive';
import { rolChecker } from '../../common/directives/rol-checker.directive';

@Component({
  selector: 'app-gebruikers-lijst',
  standalone: true,
  imports: [
    MatDividerModule,
    CommonModule,
    MatListModule,
    NavBarComponent,
    GebruikerHeaderComponent,
    MatIconModule,
    rolStyle,
    rolChecker,
  ],
  templateUrl: './gebruikers-lijst.component.html',
  styleUrls: ['./gebruikers-lijst.component.scss'],
})
export class GebruikersLijstComponent implements OnInit, OnDestroy {
  openChatrooms: ChatRoomInterface[] = [];
  closedChatrooms: ChatRoomInterface[] = [];
  userId: string = '';
  errorMessage: string = '';
  amountOfLookers: number = 0;
  amountOfLookersforMe: number = 0;
  private intervalId: any;

  constructor(
    private gebruikerService: GebruikerService,
    private lookerQueueService: LookerQueueService,
    private chatService: ChatService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.gebruikerService.getGebruikerIdByToken().subscribe((userId) => {
      this.userId = userId;
      this.fetchChatRooms();
      this.lookerQueueService.getAmountOfLookers().subscribe(
        (response) => {
          this.amountOfLookers = response.amount; // Update to correctly assign the amount
        },
        (error) => {
          console.error('Error fetching amount of lookers:', error);
        },
      );
      this.lookerQueueService.getAmountOfLookersForMe(this.userId).subscribe(
        (response) => {
          this.amountOfLookersforMe = response.amount; // Update to correctly assign the amount
        },
        (error) => {
          console.error('Error fetching amount of lookers for me:', error);
        },
      );

      // Set interval to fetch chatrooms every 3 seconds
      this.intervalId = setInterval(() => {
        this.fetchChatRooms();
      }, 3000);
    });
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  fetchChatRooms(): void {
    this.chatService.getMyChatRooms(this.userId).subscribe(
      (chatrooms) => {
        this.openChatrooms = chatrooms.filter(
          (chatroom) => !chatroom.isAfgesloten,
        );
        this.closedChatrooms = chatrooms.filter(
          (chatroom) => chatroom.isAfgesloten,
        );
      },
      (error) => {
        console.error('Error fetching chatrooms:', error);
      },
    );
  }

  openChat(chatroom: ChatRoomInterface): void {
    this.router.navigate(['/chat', chatroom.chatId]);
  }

  stringToColor(email: string): string {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 75%, 60%)`;
    return color;
  }

  helpSomeone(): void {
    this.lookerQueueService.getFirstLooker(this.userId).subscribe(
      (response) => {
        if (response) {
          this.router.navigate(['/chat', response]);
        } else {
          this.errorMessage = 'Er is geen looker beschikbaar';
        }
      },
      (error) => {
        this.errorMessage = 'Er is geen looker beschikbaar';
        console.error('Error fetching first looker:', error);
      },
    );
  }

  protected readonly GebruikerRol = GebruikerRol;
}
