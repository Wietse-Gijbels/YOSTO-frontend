import { Component, OnInit } from '@angular/core';
import {
  AntwoordDTO,
  GebruikerWaardes,
  Topic,
  Vraag,
} from '../common/models/interfaces';
import { MatchingTestService } from '../common/service/matching-test.service';
import { CookieService } from 'ngx-cookie-service';
import { NgForOf, NgIf } from '@angular/common';
import { NavBarComponent } from '../common/navigation/nav-bar.component';
import { BaseChartDirective } from 'ng2-charts';
import { SimilarityService } from '../common/service/similarity.service';
import { GebruikerService } from '../common/service/gebruiker.service';
import { GebruikerHeaderComponent } from '../common/gebruiker-header/gebruiker-header.component';

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
          showLabelBackdrop: false, // Hide the label backdrop for the ticks
        },
        pointLabels: {
          font: {
            size: 14,
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
        display: true, // Show the legend to distinguish datasets
      },
    },
  };
  userId: string = '';
  similarities: any[] = []; // To store the similarities

  constructor(
    private matchingTestService: MatchingTestService,
    private cookieService: CookieService,
    private similarityService: SimilarityService,
    private gebruikerService: GebruikerService,
  ) {}

  ngOnInit(): void {
    this.fetchVragen();
    console.log(this.vragen);
    this.gebruikerService
      .getGebruikerIdByToken(this.cookieService.get('token'))
      .subscribe((userId) => {
        this.userId = userId;
      });
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
      if (this.currentVraagIndex < this.vragen.length - 1) {
        this.currentVraagIndex++;
        this.updateProgress(); // Add this line to update progress
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
    this.matchingTestService.calculateGebruikerWaardes().subscribe((data) => {
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
      .subscribe((similarities) => {
        this.similarities = similarities.slice(0, 10); // Get top 10
      });
  }

  updateChart(): void {
    this.radarChartData = [
      {
        data: this.topics.map((topic) => topic.value),
        label: 'Mijn Skills',
      },
    ];
  }
}
