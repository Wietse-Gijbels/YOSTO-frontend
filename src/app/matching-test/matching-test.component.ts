import { Component, OnInit } from '@angular/core';
import {
  AntwoordDTO,
  GebruikerWaardes,
  Topic,
  Vraag,
} from '../common/models/interfaces';
import { MatchingTestService } from '../common/service/matching-test.service';
import { NgForOf, NgIf } from '@angular/common';
import { NavBarComponent } from '../common/navigation/nav-bar.component';
import { BaseChartDirective } from 'ng2-charts';
import { SimilarityService } from '../common/service/similarity.service';
import { GebruikerService } from '../common/service/gebruiker.service';
import { GebruikerHeaderComponent } from '../common/gebruiker-header/gebruiker-header.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-matching-test',
  standalone: true,
  imports: [
    NgIf,
    NavBarComponent,
    BaseChartDirective,
    NgForOf,
    GebruikerHeaderComponent,
  ],
  templateUrl: './matching-test.component.html',
  styleUrls: ['./matching-test.component.scss'],
})
export class MatchingTestComponent implements OnInit {
  vragen: Vraag[] = [];
  currentVraagIndex = 0;
  testCompleted = false;
  gebruikerWaardes?: GebruikerWaardes;
  progressPercentage = 0;
  topics: Topic[] = [];
  radarChartData: any[] = [];
  radarChartLabels: any[] = [];
  radarChartOptions = {
    responsive: true,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          beginAtZero: true,
          stepSize: 20,
          backdropColor: 'rgba(0, 0, 0, 0)',
          showLabelBackdrop: false,
        },
        pointLabels: {
          font: {
            size: 16,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  userId: string = '';
  similarities: any[] = [];

  constructor(
    private matchingTestService: MatchingTestService,
    private similarityService: SimilarityService,
    private gebruikerService: GebruikerService,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.gebruikerService.getGebruikerWaardes().subscribe({
      next: (data): void => {
        this.gebruikerWaardes = data;
        this.testCompleted = true;
        this.calculateGebruikerWaardes();
      },
      error: (err) => {
        if (err.error.errorGebruikerWaardes) {
          this.fetchVragen();
        } else {
          console.error(err);
        }
      },
    });

    this.gebruikerService.getGebruikerIdByToken().subscribe((userId) => {
      this.userId = userId;
    });

    this.matchingTestService.getAmountOfAntwoorden().subscribe((amount) => {
      this.currentVraagIndex = amount;
      this.updateProgress();
    });
  }

  fetchVragen(): void {
    this.matchingTestService.getVragen().subscribe((data) => {
      this.vragen = data;
      this.updateProgress();
    });
  }

  antwoordGegeven(antwoord: string): void {
    const huidigeVraag = this.vragen[this.currentVraagIndex];
    const antwoordData: AntwoordDTO = {
      vraagId: huidigeVraag.id,
      antwoord: antwoord,
    };

    this.matchingTestService.saveAntwoorden([antwoordData]).subscribe(() => {
      if (this.currentVraagIndex < this.vragen.length - 1) {
        this.currentVraagIndex++;
        this.updateProgress();
      } else {
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
    this.matchingTestService
      .calculateGebruikerWaardes()
      .subscribe((data): void => {
        this.gebruikerWaardes = data;
        this.testCompleted = true;

        this.topics = [
          {
            name: 'Conventioneel',
            value: this.gebruikerWaardes.conventioneel,
          },
          { name: 'Praktisch', value: this.gebruikerWaardes.praktisch },
          { name: 'Analytisch', value: this.gebruikerWaardes.analytisch },
          { name: 'Kunstzinnig', value: this.gebruikerWaardes.kunstzinnig },
          { name: 'Sociaal', value: this.gebruikerWaardes.sociaal },
          { name: 'Ondernemend', value: this.gebruikerWaardes.ondernemend },
        ];
        this.radarChartLabels = this.topics.map((topic) => topic.name);
        this.updateChart();
        this.calculateSimilarity();
      });
  }

  calculateSimilarity(): void {
    const userValues = {
      conventioneel: this.gebruikerWaardes?.conventioneel || 50,
      praktisch: this.gebruikerWaardes?.praktisch || 50,
      analytisch: this.gebruikerWaardes?.analytisch || 50,
      kunstzinnig: this.gebruikerWaardes?.kunstzinnig || 50,
      sociaal: this.gebruikerWaardes?.sociaal || 50,
      ondernemend: this.gebruikerWaardes?.ondernemend || 50,
      gebruiker: {
        id: this.userId,
      },
    };

    this.similarityService
      .calculateSimilarity(userValues)
      .subscribe((similarities): void => {
        this.similarities = similarities.slice(0, 10); // De top 10 richtingen ophalen
      });
  }

  updateChart(): void {
    this.radarChartData = [
      {
        data: this.topics.map((topic) => topic.value),
        label: 'Mijn Interesses',
      },
    ];
  }
}
