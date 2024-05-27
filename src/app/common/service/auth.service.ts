import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationResponse } from '../models/interfaces';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string = this.cookieService.get('token');
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  registreerLooker(formData: any): Observable<AuthenticationResponse> {
    const { bevestigWachtwoord, ...registreerData } = formData;

    return this.httpClient
      .post<AuthenticationResponse>(
        'http://localhost:8080/api/v1/auth/registreer',
        registreerData,
        { headers: this.headers },
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
        { headers: this.headers },
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
        { headers: this.headers },
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
