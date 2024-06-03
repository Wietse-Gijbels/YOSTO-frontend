import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { CookieService } from 'ngx-cookie-service';
import { MatIconModule } from '@angular/material/icon';
import { LookerQueueService } from '../../common/service/lookerQueue.service';
import { GebruikerInterface } from '../../common/models/interfaces';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { GebruikerService } from '../../common/service/gebruiker.service';
import { ChatService } from '../../common/service/chat.service';

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
  ],
  templateUrl: './gebruikers-lijst.component.html',
  styleUrls: ['./gebruikers-lijst.component.scss'],
})
export class GebruikersLijstComponent implements OnInit {
  gebruikers: GebruikerInterface[] = [];
  userId: string = '';
  errorMessage: string = '';
  amountOfLookers: number = 0;

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
      this.chatService.getMyChatRooms(userId).subscribe(
        (gebruikers) => {
          this.gebruikers = gebruikers.filter(
            (gebruiker) => gebruiker.id !== this.userId,
          );
        },
        (error) => {
          console.error('Error fetching gebruikers:', error);
        },
      );
    });

    this.lookerQueueService.getAmountOfLookers().subscribe(
      (response) => {
        console.log('Amount of lookers:', response);
        this.amountOfLookers = response.amount; // Update to correctly assign the amount
      },
      (error) => {
        console.error('Error fetching amount of lookers:', error);
      },
    );
  }

  openChat(gebruiker: GebruikerInterface): void {
    this.router.navigate(['/chat', gebruiker.id]);
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
        console.log('Error fetching first looker:', error);
      },
    );
  }
}
