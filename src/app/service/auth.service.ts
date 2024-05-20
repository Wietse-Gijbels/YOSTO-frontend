import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationResponse } from '../models/interfaces';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
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

  registreerLooker(formData: any): Observable<AuthenticationResponse> {
    const { bevestigWachtwoord, huidigeStudie, ...registreerData } = formData;

    return this.httpClient
      .post<AuthenticationResponse>(
        'http://localhost:8080/api/v1/auth/registreer',
        registreerData,
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
      );
  }

  registreerHelper(formData: any): Observable<AuthenticationResponse> {
    const {
      bevestigWachtwoord,
      huidigeStudie,
      behaaldDiploma,
      behaaldeDiplomaArray,
      toegevoegdDiploma,
      ...registreerData
    } = formData;

    return this.httpClient
      .post<AuthenticationResponse>(
        'http://localhost:8080/api/v1/auth/registreer',
        registreerData,
      )
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
      );
  }

  login(formData: any): Observable<AuthenticationResponse> {
    return this.httpClient
      .post<AuthenticationResponse>(
        'http://localhost:8080/api/v1/auth/login',
        formData,
      )
      .pipe(
        catchError((error) => {
          throw error;
        }),
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
