import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { LookerQueueService } from '../../common/service/lookerQueue.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from '../../common/service/snackbar.service';
import { rolStyle } from '../../common/directives/rol-style.directive';
import { rolChecker } from '../../common/directives/rol-checker.directive';
import { GebruikerRol } from '../../common/models/interfaces';

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
    MatSnackBarModule,
    rolStyle,
    rolChecker,
  ],
  templateUrl: './studierichting-details.component.html',
  styleUrls: ['./studierichting-details.component.scss'],
})
export class StudierichtingDetailsComponent implements OnInit, OnDestroy {
  studierichtingId: string | null = null;
  public studierichting$?: Observable<StudierichtingInterface>;
  studierichtingWaardes: any;
  gebruikerWaardes: any;
  radarChartData: any[] = [];
  radarChartLabels: string[] = [
    'Conventioneel',
    'Praktisch',
    'Analytisch',
    'Kunstzinnig',
    'Sociaal',
    'Ondernemend',
  ];
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
  protected readonly encodeURIComponent = encodeURIComponent;
  protected readonly faLocationDot: IconDefinition = faLocationDot;
  private readonly destroy$: Subject<void> = new Subject<void>();
  protected readonly GebruikerRol = GebruikerRol;
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private studierichtingService: StudierichtingService,
    private similarityService: SimilarityService,
    private gebruikerService: GebruikerService,
    private cookieService: CookieService,
    private lookerQueueService: LookerQueueService,
    private snackbarService: SnackbarService, // Add this line
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params: ParamMap): void => {
        this.studierichtingId = params.get('id');
        if (this.studierichtingId) {
          this.studierichting$ = this.studierichtingService.findStudierichting(
            this.studierichtingId,
          );

          this.studierichting$
            .pipe(takeUntil(this.destroy$))
            .subscribe((studierichting: StudierichtingInterface): void => {
              this.similarityService
                .getStudierichtingWaardesById(this.studierichtingId!)
                .pipe(takeUntil(this.destroy$))
                .subscribe((data): void => {
                  this.studierichtingWaardes = data;
                  this.updateChart(studierichting.naam);
                  this.getGebruikerWaardes();
                });
            });
        }
      });

    this.adjustChartOptionsForScreenSize();
    window.addEventListener(
      'resize',
      this.adjustChartOptionsForScreenSize.bind(this),
    );

    this.gebruikerService.getGebruikerIdByToken().subscribe((userId) => {
      this.userId = userId;
    });
  }

  adjustChartOptionsForScreenSize(): void {
    const screenWidth: number = window.innerWidth;
    if (screenWidth < 600) {
      this.radarChartOptions = {
        ...this.radarChartOptions,
        scales: {
          r: {
            ...this.radarChartOptions.scales.r,
            pointLabels: {
              font: {
                size: 10,
              },
            },
          },
        },
      };
    } else {
      this.radarChartOptions = {
        ...this.radarChartOptions,
        scales: {
          r: {
            ...this.radarChartOptions.scales.r,
            pointLabels: {
              font: {
                size: 14,
              },
            },
          },
        },
      };
    }
  }

  getGebruikerWaardes(): void {
    this.gebruikerService.getGebruikerIdByToken().subscribe(() => {
      this.gebruikerService.getGebruikerWaardes().subscribe((data) => {
        this.gebruikerWaardes = data;
        this.updateGebruikerWaardesChart(data);
      });
    });
  }

  updateGebruikerWaardesChart(gebruikerWaardes: any): void {
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
      this.radarChartData = [...this.radarChartData, userValues];
    }
  }

  updateChart(studierichtingNaam: string): void {
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
          label: studierichtingNaam,
        },
      ];
    }
  }

  joinQueue(): void {
    if (this.userId && this.studierichtingId) {
      this.lookerQueueService
        .joinQueue(this.userId, this.studierichtingId)
        .subscribe(
          () => {
            this.snackbarService.openSnackBar(
              'You have been added to the queue successfully.',
              'success',
            );
          },
          (error) => {
            console.error('Error joining the queue:', error);
            this.snackbarService.openSnackBar(
              'Failed to join the queue. Please try again later.',
              'error',
            );
          },
        );
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // window.removeEventListener(
    //   'resize',
    //   this.adjustChartOptionsForScreenSize.bind(this),
    // );
  }
}
