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

  setRol(rol: GebruikerRol) {
    this.rol = rol;
  }

  getRol(): GebruikerRol | undefined {
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

  verify(email: string, code: string): Observable<any> {
    return this.httpClient
      .post<AuthenticationResponse>(
        this.url + '/verify?email=' + email + '&code=' + code,
        {},
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

  switchRol() {
    if (this.rol === GebruikerRol.STUDYHELPER) {
      this.setRol(GebruikerRol.STUDYLOOKER);
    } else {
      this.setRol(GebruikerRol.STUDYHELPER);
    }
    const token = this.cookieService.get('token');
    this.httpClient.post(this.url + `/switch/${token}`, {}).subscribe();
  }
}
