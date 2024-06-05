import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationResponse, GebruikerRol } from '../models/interfaces';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public rol: GebruikerRol | undefined;
  private url = environment.url + '/auth';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private httpClient: HttpClient,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  get activeRol(): GebruikerRol | undefined {
    return this.rol;
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('token');
  }

  registreerLooker(formData: any): Observable<AuthenticationResponse> {
    const { bevestigWachtwoord, ...registreerData } = formData;
    this.rol = GebruikerRol.STUDYLOOKER;

    return this.httpClient
      .post<AuthenticationResponse>(this.url + '/registreer', registreerData)
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
      );
  }

  registreerHelper(formData: any): Observable<AuthenticationResponse> {
    const { bevestigWachtwoord, ...registreerData } = formData;
    this.rol = GebruikerRol.STUDYHELPER;

    return this.httpClient
      .post<AuthenticationResponse>(this.url + '/registreer', registreerData)
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
      );
  }

  login(formData: any): Observable<AuthenticationResponse> {
    return this.httpClient
      .post<AuthenticationResponse>(this.url + '/login', formData)
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
