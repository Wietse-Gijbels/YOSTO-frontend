import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudierichtingInterface } from '../models/interfaces';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudierichtingService {
  token: string = this.cookieService.get('token');
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });
  private url = environment.url + '/studierichting';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  findAll(
    page: number,
  ): Observable<{ totalElements: number; content: StudierichtingInterface[] }> {
    return this.http.get<{
      totalElements: number;
      content: StudierichtingInterface[];
    }>(this.url + '/all/' + page, { headers: this.headers });
  }

  findStudierichting(studierichtingId: string) {
    return this.http.get<StudierichtingInterface>(
      this.url + '/' + studierichtingId,
      { headers: this.headers },
    );
  }

  getFilteredRichtingen(filter: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/all/dto`, {
      params: { filter },
      headers: this.headers,
    });
  }

  getFilteredHogerOnderwijsRichtingen(filter: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/hoger-onderwijs/dto`, {
      params: { filter },
      headers: this.headers,
    });
  }

  getOverviewFilteredHogerOnderwijsRichtingen(
    page: number,
    naam: string,
    niveau: string,
    sortOrder: string,
  ): Observable<{ totalElements: number; content: StudierichtingInterface[] }> {
    return this.http.get<{
      totalElements: number;
      content: StudierichtingInterface[];
    }>(
      this.url +
        '/filter?naam=' +
        naam +
        '&niveauNaam=' +
        niveau +
        '&sortOrder=' +
        sortOrder +
        '&page=' +
        page,
      { headers: this.headers },
    );
  }

  getFilteredHogerOnderwijsRichtingenToevoeging(
    filter: string,
  ): Observable<string[]> {
    return this.http.get<string[]>(
      `${this.url}/hoger-onderwijs/dto/${this.token}`,
      {
        params: { filter },
        headers: this.headers,
      },
    );
  }
}
