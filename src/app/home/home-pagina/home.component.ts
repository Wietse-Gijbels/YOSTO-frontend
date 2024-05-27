import { Component } from '@angular/core';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { NgClass, NgForOf, NgOptimizedImage } from '@angular/common';
import { SocialsComponent } from '../socials/socials.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarComponent,
    GebruikerHeaderComponent,
    NgOptimizedImage,
    NgForOf,
    NgClass,
    SocialsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
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

  constructor(
    private cookieService: CookieService,
    private router: Router,
  ) {}

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
}
