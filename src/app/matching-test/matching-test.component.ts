import { Component, OnInit } from '@angular/core';
import {
  AntwoordDTO,
  GebruikerWaardes,
  Vraag,
} from '../common/models/interfaces';
import { MatchingTestService } from '../common/service/matching-test.service';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';
import { NavBarComponent } from '../common/navigation/nav-bar.component';

@Component({
  selector: 'app-matching-test',
  standalone: true,
  imports: [NgIf, NavBarComponent],
  templateUrl: './matching-test.component.html',
  styleUrls: ['./matching-test.component.scss'],
})
export class MatchingTestComponent implements OnInit {
  vragen: Vraag[] = [];
  currentVraagIndex = 0;
  testCompleted = false;
  gebruikerWaardes?: GebruikerWaardes;
  progressPercentage = 0; // Add this line

  constructor(
    private matchingTestService: MatchingTestService,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.fetchVragen();
  }

  fetchVragen(): void {
    this.matchingTestService.getVragen().subscribe((data) => {
      this.vragen = data;
      this.updateProgress(); // Add this line to initialize progress
    });
  }

  antwoordGegeven(antwoord: string): void {
    const huidigeVraag = this.vragen[this.currentVraagIndex];
    const antwoordData: AntwoordDTO = {
      vraagId: huidigeVraag.id,
      antwoord: antwoord,
    };

    this.matchingTestService.saveAntwoorden([antwoordData]).subscribe(() => {
      this.currentVraagIndex++;
      this.updateProgress(); // Add this line to update progress
      if (this.currentVraagIndex >= this.vragen.length) {
        this.calculateGebruikerWaardes();
      }
    });
  }

  updateProgress(): void {
    if (this.vragen.length > 0) {
      this.progressPercentage = Math.round(
        (this.currentVraagIndex / this.vragen.length) * 100,
      );
    }
  }

  calculateGebruikerWaardes(): void {
    this.matchingTestService.calculateGebruikerWaardes().subscribe((data) => {
      this.gebruikerWaardes = data;
      this.testCompleted = true;
    });
  }
}
