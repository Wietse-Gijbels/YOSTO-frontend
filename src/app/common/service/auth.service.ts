import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationResponse, GebruikerRol } from '../models/interfaces';
import { catchError, Observable, tap, throwError } from 'rxjs';
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
        tap((response) => {
          // Handle push notification registration
          //this.handlePushNotificationRegistration(registreerData.email);
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
        tap((response) => {
          // Handle push notification registration
          //this.handlePushNotificationRegistration(registreerData.email);
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
        tap((response) => {
          // Handle push notification registration
          //this.handlePushNotificationRegistration(formData.email);
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

  registerFcmToken(token: string) {
    const url = this.url + '/api/v1/registerToken';
    return this.httpClient
      .post(url, { email: 'kuno.vercammen@gmail.com', token: token })
      .subscribe(
        (response) => console.log('Token registered successfully'),
        (error) => console.error('Error registering token', error),
      );
  }

  // private handlePushNotificationRegistration(email: string) {
  //   PushNotifications.requestPermissions().then((result) => {
  //     if (result.receive === 'granted') {
  //       PushNotifications.register();
  //     }
  //   });
  //
  //   PushNotifications.addListener('registration', (token: Token) => {
  //     this.registerFcmToken(email, token.value);
  //   });
  // }
}
