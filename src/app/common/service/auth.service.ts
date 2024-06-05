// src/app/common/service/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationResponse } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/api/v1/auth';

  constructor(private httpClient: HttpClient) {}

  login(formData: any): Observable<AuthenticationResponse> {
    return this.httpClient
      .post<AuthenticationResponse>(this.url + '/login', formData)
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
      );
  }

  registreerLooker(formData: any): Observable<AuthenticationResponse> {
    return this.httpClient
      .post<AuthenticationResponse>(this.url + '/registreer', formData)
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
      );
  }

  registreerHelper(formData: any): Observable<AuthenticationResponse> {
    return this.httpClient
      .post<AuthenticationResponse>(this.url + '/registreer', formData)
      .pipe(
        catchError((error) => {
          return throwError(error);
        }),
      );
  }
}
