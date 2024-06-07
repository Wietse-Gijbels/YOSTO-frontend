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

  getGebruiker(token: string): Observable<GebruikerInterface> {
    return this.http.get<GebruikerInterface>(
      `http://localhost:8080/api/v1/gebruiker/${token}`,
      { headers: this.headers },
    );
  }

  getGebruikerById(id: string): Observable<GebruikerInterface> {
    return this.http.get<GebruikerInterface>(
      `http://localhost:8080/api/v1/gebruiker/gebruiker/${id}`,
    );
  }

  updateGebruiker(
    token: string,
    fromData: any,
  ): Observable<GebruikerInterface> {
    return this.http.put<GebruikerInterface>(
      `http://localhost:8080/api/v1/gebruiker/${token}`,
      fromData,
      { headers: this.headers },
    );
  }

  saveGebruikerWaardes(userValues: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8080/api/v1/gebruikerWaardes/save`,
      userValues,
      { headers: this.headers },
    );
  }

  getGebruikerWaardes(): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/api/v1/gebruikerWaardes/token/${this.token}`,
      { headers: this.headers },
    );
  }

  addGebruikerXp(id: string, xp: number): Observable<void> {
    return this.http.post<void>(
      'http://localhost:8080/api/v1/gebruiker/xp',
      { id, xp },
      { headers: this.headers },
    );
  }
}
