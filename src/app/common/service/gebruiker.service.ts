import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { GebruikerInterface, GebruikerRol } from '../models/interfaces';
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

  getRol(): Observable<GebruikerRol> {
    return this.http.get<GebruikerRol>(
      `http://localhost:8080/api/v1/gebruiker/rol/${this.token}`,
      { headers: this.headers },
    );
  }

  getRollen() {
    return this.http.get<GebruikerRol[]>(
      `http://localhost:8080/api/v1/gebruiker/rollen`,
      { headers: this.headers },
    );
  }

  changeActiveRol(rol: GebruikerRol) {
    return this.http.put<void>(
      `http://localhost:8080/api/v1/gebruiker/rol`,
      { rol },
      { headers: this.headers },
    );
  }
}
