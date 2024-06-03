import { Component, OnInit } from '@angular/core';
import { StudierichtingService } from '../../common/service/studierichting.service';
import {
  GebruikerInterface,
  StudierichtingInterface,
} from '../../common/models/interfaces';
import { Observable, ReplaySubject, switchMap } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { AsyncPipe, NgStyle } from '@angular/common';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import {
  faHeart as faHeartFull,
  faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { CardComponent } from '../card/card.component';
import { GebruikerService } from '../../common/service/gebruiker.service';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { CookieService } from 'ngx-cookie-service';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-studierichtingen',
  templateUrl: './favorieten.component.html',
  styleUrls: ['./favorieten.component.scss'],
  standalone: true,
  imports: [
    GebruikerHeaderComponent,
    AsyncPipe,
    NgStyle,
    MatPaginator,
    NavBarComponent,
    CardComponent,
  ],
})
export class FavorietenComponent implements OnInit {
  public studierichtingen$!: Observable<{
    totalElements: number;
    content: StudierichtingInterface[];
  }>;
  public gebruiker$ = new ReplaySubject<GebruikerInterface>(0);
  public pageSize = 10;
  public page = 0;

  constructor(
    private studierichtingService: StudierichtingService,
    private gebruikerService: GebruikerService,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    this.loadPage(this.page);
    const token = this.cookieService.get('token');
    this.gebruikerService.getGebruiker(token).subscribe({
      next: (gebruiker) => {
        this.gebruiker$.next(gebruiker);
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.loadPage(event.pageIndex);
  }

  private loadPage(page: number) {
    this.studierichtingen$ = this.gebruikerService.findAllFavorieten(page);
  }

  favorite(studierichtingId: string, icon: IconProp) {
    const token = this.cookieService.get('token');

    if (icon == faHeart) {
      this.gebruikerService
        .addFavorieteStudierichtingToGebruiker(studierichtingId)
        .pipe(switchMap(() => this.gebruikerService.getGebruiker(token)))
        .subscribe({
          next: (gebruiker) => {
            this.gebruiker$.next(gebruiker);
            console.log(
              'Favoriete studierichting toegevoegd en gebruiker bijgewerkt',
              gebruiker,
            );
          },
          error: (error) => {
            console.error('Er is een fout opgetreden:', error);
          },
        });
    } else {
      this.gebruikerService
        .removeFavorieteStudierichtingToGebruiker(studierichtingId)
        .pipe(switchMap(() => this.gebruikerService.getGebruiker(token)))
        .subscribe({
          next: (gebruiker) => {
            this.gebruiker$.next(gebruiker);
            console.log(
              'Favoriete studierichting toegevoegd en gebruiker bijgewerkt',
              gebruiker,
            );
          },
          error: (error) => {
            console.error('Er is een fout opgetreden:', error);
          },
        });
    }
  }

  protected readonly faLocationDot = faLocationDot;
  protected readonly encodeURIComponent = encodeURIComponent;
  protected readonly faHeart = faHeart;
  protected readonly faHeartFull = faHeartFull;

  includesFavoStudie(
    gebruiker: GebruikerInterface,
    studierichting: StudierichtingInterface,
  ): boolean {
    return gebruiker.favorieteStudierichtingen.some(
      (favo) => favo.id === studierichting.id,
    );
  }
}
