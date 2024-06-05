import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GebruikerWaardesService {
  token: string = this.cookieService.get('token');
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  private urlMobile = '/gebruikerWaardes';
  private url = environment.url + '/gebruikerWaardes';

  saveGebruikerWaardes(userValues: any): Observable<any> {
    return this.http.post<any>(this.url + `/save`, userValues, {
      headers: this.headers,
    });
  }

  getGebruikerWaardes(): Observable<any> {
    return this.http.get<any>(this.url + `/token/${this.token}`, {
      headers: this.headers,
    });
  }
}
