import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { NgClass, NgForOf, NgOptimizedImage } from '@angular/common';
import { SocialsComponent } from '../socials/socials.component';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { GebruikerRol } from '../../common/models/interfaces';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { rolStyle } from '../../common/directives/rol-style.directive';
import { rolChecker } from '../../common/directives/rol-checker.directive';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
  Token,
} from '@capacitor/push-notifications';

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

  navigateToTest(): void {
    this.router.navigateByUrl('/test');
  }

  ngOnInit() {
    console.log('Initializing HomePage');

    // Request permission to use push notifications
    // iOS will prompt user and return if they granted permission or not
    // Android will just grant without prompting
    PushNotifications.requestPermissions().then((result) => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration', (token: Token) => {
      alert('Push registration success, token: ' + token.value);
    });

    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    // Method called when tapping on a notification
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );
  }
}
