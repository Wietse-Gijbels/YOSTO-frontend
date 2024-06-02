import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { CardComponent } from '../card/card.component';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { StudierichtingInterface } from '../../common/models/interfaces';
import { StudierichtingService } from '../../common/service/studierichting.service';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { SimilarityService } from '../../common/service/similarity.service';
import { BaseChartDirective } from 'ng2-charts';
import { GebruikerService } from '../../common/service/gebruiker.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-studierichting-details',
  standalone: true,
  imports: [
    GebruikerHeaderComponent,
    NavBarComponent,
    AsyncPipe,
    FaIconComponent,
    CardComponent,
    MatTabGroup,
    MatTab,
    BaseChartDirective,
  ],
  templateUrl: './studierichting-details.component.html',
  styleUrls: ['./studierichting-details.component.scss'],
})
export class StudierichtingDetailsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  studierichtingId: string | null = null;
  public studierichting$?: Observable<StudierichtingInterface>;
  studierichtingWaardes: any;
  radarChartData: any[] = [];
  radarChartLabels = [
    'Conventioneel',
    'Praktisch',
    'Analytisch',
    'Kunstzinnig',
    'Sociaal',
    'Ondernemend',
  ];

  // Default chart options
  radarChartOptions: any = {
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
        display: true,
      },
    },
  };

  constructor(
    private route: ActivatedRoute,
    private studierichtingService: StudierichtingService,
    private similarityService: SimilarityService,
    private gebruikerService: GebruikerService,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.studierichtingId = params.get('id');
      if (this.studierichtingId) {
        this.studierichting$ = this.studierichtingService.findStudierichting(
          this.studierichtingId,
        );

        this.studierichting$
          .pipe(takeUntil(this.destroy$))
          .subscribe((studierichting) => {
            this.similarityService
              .getStudierichtingWaardesById(this.studierichtingId!)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                (data) => {
                  this.studierichtingWaardes = data;
                  this.updateChart(studierichting.naam);
                  this.getGebruikerWaardes(); // Fetch gebruikerwaardes here
                },
                (error) => {
                  console.error('Error fetching StudierichtingWaardes:', error);
                },
              );
          });
      }
    });

    this.adjustChartOptionsForScreenSize();
    window.addEventListener(
      'resize',
      this.adjustChartOptionsForScreenSize.bind(this),
    );
  }

  adjustChartOptionsForScreenSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 600) {
      // Small screen adjustments
      this.radarChartOptions = {
        ...this.radarChartOptions,
        scales: {
          r: {
            ...this.radarChartOptions.scales.r,
            pointLabels: {
              font: {
                size: 10, // Smaller font size for labels
              },
            },
          },
        },
      };
    } else {
      // Default settings for larger screens
      this.radarChartOptions = {
        ...this.radarChartOptions,
        scales: {
          r: {
            ...this.radarChartOptions.scales.r,
            pointLabels: {
              font: {
                size: 14, // Default font size for labels
              },
            },
          },
        },
      };
    }
  }

  getGebruikerWaardes() {
    this.gebruikerService
      .getGebruikerIdByToken(this.cookieService.get('token'))
      .subscribe(
        (userId) => {
          console.log('GebruikerId:', userId);
          this.gebruikerService.getGebruikerWaardes(userId).subscribe(
            (data) => {
              console.log('GebruikerWaardes:', data); // Check if data is logged correctly
              this.updateGebruikerWaardesChart(data);
            },
            (error) => {
              console.error('Error fetching GebruikerWaardes:', error);
            },
          );
        },
        (error) => {
          console.error('Error fetching GebruikerId:', error);
        },
      );
  }

  updateGebruikerWaardesChart(gebruikerWaardes: any) {
    if (gebruikerWaardes) {
      const userValues = {
        data: [
          gebruikerWaardes.conventioneel,
          gebruikerWaardes.praktisch,
          gebruikerWaardes.analytisch,
          gebruikerWaardes.kunstzinnig,
          gebruikerWaardes.sociaal,
          gebruikerWaardes.ondernemend,
        ],
        label: 'Mijn Resultaten',
      };
      this.radarChartData = [...this.radarChartData, userValues]; // Update chart data
      console.log('Updated radarChartData:', this.radarChartData); // Check if chart data is updated
    }
  }

  updateChart(studierichtingNaam: string) {
    if (this.studierichtingWaardes) {
      this.radarChartData = [
        {
          data: [
            this.studierichtingWaardes.conventioneel,
            this.studierichtingWaardes.praktisch,
            this.studierichtingWaardes.analytisch,
            this.studierichtingWaardes.kunstzinnig,
            this.studierichtingWaardes.sociaal,
            this.studierichtingWaardes.ondernemend,
          ],
          label: studierichtingNaam, // Use the name passed to this method
        },
      ];
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    window.removeEventListener(
      'resize',
      this.adjustChartOptionsForScreenSize.bind(this),
    );
  }

  protected readonly encodeURIComponent = encodeURIComponent;
  protected readonly faLocationDot = faLocationDot;
}
