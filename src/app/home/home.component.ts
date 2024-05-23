import { Component } from '@angular/core';
import { NavBarComponent } from '../navigation/nav-bar.component';
import { GebruikerHeaderComponent } from '../gebruiker/gebruiker-header/gebruiker-header.component';
import { NgClass, NgForOf, NgOptimizedImage } from '@angular/common';
import { SocialsComponent } from '../socials/socials.component';

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
}
