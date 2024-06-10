import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { AsyncPipe, NgClass, NgForOf, NgOptimizedImage } from '@angular/common';
import { SocialsComponent } from '../socials/socials.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {
  GebruikerInterface,
  GebruikerRol,
} from '../../common/models/interfaces';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { rolStyle } from '../../common/directives/rol-style.directive';
import { rolChecker } from '../../common/directives/rol-checker.directive';
import { Observable } from 'rxjs';
import { GebruikerService } from '../../common/service/gebruiker.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarComponent,
    NgOptimizedImage,
    NgForOf,
    NgClass,
    SocialsComponent,
    GebruikerHeaderComponent,
    rolStyle,
    rolChecker,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  interests = [
    {
      name: 'Dieetkunde',
      backgroundColor: 'background-rood',
      icon: '../../assets/images/studeer-hoed.png',
    },
    {
      name: 'Idea & innovation',
      backgroundColor: 'background-roze',
      icon: '../../assets/images/studeer-hoed.png',
    },
    {
      name: 'Communication',
      backgroundColor: 'background-oranje',
      icon: '../../assets/images/studeer-hoed.png',
    },
  ];
  internships = [
    { name: 'Business Consultant', backgroundColor: 'background-groen' },
    { name: 'Tandarts', backgroundColor: 'background-geel' },
    { name: 'ICT-helpdesk', backgroundColor: 'background-paars' },
  ];
  protected readonly GebruikerRol = GebruikerRol;
  gebruiker$: Observable<GebruikerInterface> | undefined;

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private gebruikerService: GebruikerService,
  ) {}

  ngOnInit() {
    this.gebruiker$ = this.gebruikerService.getGebruiker(
      this.cookieService.get('token'),
    );
  }

  logout(): void {
    this.cookieService.delete('token');
    this.router.navigateByUrl('/');
  }

  addGeschenk(): void {
    this.router.navigateByUrl('/add-geschenk');
  }

  addGeschenkCategorie(): void {
    this.router.navigateByUrl('/add-geschenk-categorie');
  }

  geschenkenOverview(): void {
    this.router.navigateByUrl('/geschenken-overview');
  }

  navigateToTest(): void {
    this.router.navigateByUrl('/test');
  }

  navigateToChats(): void {
    this.router.navigateByUrl('/chat');
  }
}
