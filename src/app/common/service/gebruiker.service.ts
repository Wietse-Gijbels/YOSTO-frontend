import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GebruikerInterface } from '../models/interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class GebruikerService {
  token: string = this.cookieService.get('token');
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  getAllConectedGebruikers(): Observable<GebruikerInterface[]> {
    return this.http.get<GebruikerInterface[]>(
      'http://localhost:8080/api/v1/gebruiker/online',
      { headers: this.headers },
    );
  }

  getGebruikerIdByToken(token: string): Observable<string> {
    return this.http
      .get<{
        id: string;
      }>(`http://localhost:8080/api/v1/gebruiker/id/${token}`, {
        headers: this.headers,
      })
      .pipe(map((response) => response.id));
  }

  getGebruikerById(id: string): Observable<GebruikerInterface> {
    return this.http.get<GebruikerInterface>(
      `http://localhost:8080/api/v1/gebruiker/gebruiker/${id}`,
    );
  }
}
