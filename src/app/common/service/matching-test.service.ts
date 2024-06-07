import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { AntwoordDTO, GebruikerWaardes, Vraag } from '../models/interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MatchingTestService {
  token: string = this.cookieService.get('token');
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });
  private vraagUrl = environment.url + '/vragen';
  private antwoordUrl = environment.url + '/antwoorden';
  private calculateWaardesUrl = environment.url + '/gebruikerWaardes';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  getVragen(): Observable<Vraag[]> {
    return this.http.get<Vraag[]>(this.vraagUrl, { headers: this.headers });
  }

  saveAntwoorden(antwoordDTOs: AntwoordDTO[]): Observable<any> {
    const params = new HttpParams().set('token', this.token);
    return this.http.post(this.antwoordUrl, antwoordDTOs, {
      headers: this.headers,
      params,
    });
  }

  getAmountOfAntwoorden(): Observable<any> {
    return this.http.get<number>(this.antwoordUrl + `/aantal/${this.token}`, {
      headers: this.headers,
    });
  }

  calculateGebruikerWaardes(): Observable<GebruikerWaardes> {
    return this.http.post<GebruikerWaardes>(
      `${this.calculateWaardesUrl}/${this.token}/calculate`,
      null,
      {
        headers: this.headers,
      },
    );
  }
}
