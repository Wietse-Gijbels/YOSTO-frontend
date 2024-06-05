import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  GebruikerInterface,
  GebruikerRol,
  StudierichtingInterface,
} from '../models/interfaces';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GebruikerService {
  token: string = this.cookieService.get('token');
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });
  public rol: GebruikerRol | undefined;
  private urlMobile = environment.url + '/gebruiker';
  private url = environment.url + '/gebruiker';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  get activeRol(): GebruikerRol | undefined {
    return this.rol;
  }

  getAllConectedGebruikers(): Observable<GebruikerInterface[]> {
    return this.http.get<GebruikerInterface[]>(this.url + '/online', {
      headers: this.headers,
    });
  }

  getGebruikerIdByToken(): Observable<string> {
    return this.http
      .get<{
        id: string;
      }>(this.url + `/id/${this.token}`, {
        headers: this.headers,
      })
      .pipe(map((response) => response.id));
  }

  getGebruiker(token: string): Observable<GebruikerInterface> {
    return this.http.get<GebruikerInterface>(this.url + `/${token}`, {
      headers: this.headers,
    });
  }

  getGebruikerById(id: string): Observable<GebruikerInterface> {
    return this.http.get<GebruikerInterface>(this.url + `/${id}`, {
      headers: this.headers,
    });
  }

  updateGebruiker(
    token: string,
    fromData: any,
  ): Observable<GebruikerInterface> {
    return this.http.put<GebruikerInterface>(this.url + `/${token}`, fromData, {
      headers: this.headers,
    });
  }

  getRol(): Observable<GebruikerRol> {
    const gebruiker = this.http.get<GebruikerRol>(
      `http://localhost:8080/api/v1/gebruiker/rol/${this.token}`,
      { headers: this.headers },
    );
    gebruiker.subscribe((rol) => {
      this.rol = rol;
    });
    return gebruiker;
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

  addFavorieteStudierichtingToGebruiker(studierichtingId: string) {
    return this.http.post<void>(
      this.url + `/addFavorieteStudierichting/${studierichtingId}`,
      studierichtingId,
      { headers: this.headers },
    );
  }

  removeFavorieteStudierichtingToGebruiker(studierichtingId: string) {
    return this.http.post<void>(
      this.url + `/removeFavorieteStudierichting/${studierichtingId}`,
      studierichtingId,
      { headers: this.headers },
    );
  }

  findAllFavorieten(
    page: number,
  ): Observable<{ totalElements: number; content: StudierichtingInterface[] }> {
    return this.http.get<{
      totalElements: number;
      content: StudierichtingInterface[];
    }>(this.url + '/favorietenStudierichtingen/' + page, {
      headers: this.headers,
    });
  }
}
