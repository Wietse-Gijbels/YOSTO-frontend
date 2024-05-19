import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RegistreerResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: string,
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      // Dit is om te checken of er een localstorage aanwezig is
      return !!localStorage.getItem('token');
      // TO DO Call naar de backend om te checken of dat de token die aanwezig is in de localstorage wel valid is
    }
    return false;
  }

  registreer(formData: any): void {
    // Verwijder het bevestigWachtwoord-veld voordat we de registratie uitvoeren
    const { bevestigWachtwoord, huidigeStudie, ...registreerData } = formData;

    this.httpClient
      .post<RegistreerResponse>(
        'http://localhost:8080/api/v1/auth/registreer',
        registreerData,
      )
      .subscribe(
        (response) => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/');
        },
        (error) => {
          console.error('Fout bij registreren:', error);
          // Handel fouten hier verder af indien nodig
        },
      );
  }
}
