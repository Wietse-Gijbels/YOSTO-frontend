import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return this.cookieService.check('token');
    }
    return false;
  }

  registreerLooker(formData: any): void {
    // Verwijder het bevestigWachtwoord-veld voordat we de registratie uitvoeren
    const { bevestigWachtwoord, huidigeStudie, ...registreerData } = formData;

    this.httpClient
      .post<AuthenticationResponse>(
        'http://localhost:8080/api/v1/auth/registreer',
        registreerData,
      )
      .subscribe(
        (response) => {
          this.cookieService.set('token', response.token);
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.error('Fout bij registreren:', error);
          // Handle errors here if necessary
        },
      );
  }

  registreerHelper(formData: any): void {
    // Verwijder het bevestigWachtwoord-veld voordat we de registratie uitvoeren
    const {
      bevestigWachtwoord,
      huidigeStudie,
      behaaldDiploma,
      behaaldeDiplomaArray,
      toegevoegdDiploma,
      ...registreerData
    } = formData;

    this.httpClient
      .post<AuthenticationResponse>(
        'http://localhost:8080/api/v1/auth/registreer',
        registreerData,
      )
      .subscribe(
        (response) => {
          this.cookieService.set('token', response.token);
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.error('Fout bij registreren:', error);
          // Handle errors here if necessary
        },
      );
  }

  login(formData: any): void {
    this.httpClient
      .post<AuthenticationResponse>(
        'http://localhost:8080/api/v1/auth/login',
        formData,
      )
      .subscribe(
        (response) => {
          this.cookieService.set('token', response.token);
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.error('Fout bij inloggen:', error);
          // Handle errors here if necessary
        },
      );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.delete('token');
      this.router.navigateByUrl('/login');
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return this.cookieService.get('token');
    }
    return null;
  }
}
