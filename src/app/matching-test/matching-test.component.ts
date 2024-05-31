import { Component, OnInit } from '@angular/core';
import {
  AntwoordDTO,
  GebruikerWaardes,
  Vraag,
} from '../common/models/interfaces';
import { MatchingTestService } from '../common/service/matching-test.service';
import { CookieService } from 'ngx-cookie-service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-matching-test',
  standalone: true,
  imports: [NgIf],
  templateUrl: './matching-test.component.html',
  styleUrl: './matching-test.component.scss',
})
export class MatchingTestComponent implements OnInit {
  vragen: Vraag[] = [];
  currentVraagIndex = 0;
  testCompleted = false;
  gebruikerWaardes?: GebruikerWaardes;

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
      if (this.currentVraagIndex >= this.vragen.length) {
        this.calculateGebruikerWaardes();
      }
    });
  }

  calculateGebruikerWaardes(): void {
    this.matchingTestService.calculateGebruikerWaardes().subscribe((data) => {
      this.gebruikerWaardes = data;
      this.testCompleted = true;
    });
  }
}
