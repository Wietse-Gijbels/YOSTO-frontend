import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StudierichtingInterface } from '../models/interfaces';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class StudierichtingService {
  token: string = this.cookieService.get('token');
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });
  private studierichtingUrl = 'http://localhost:8080/api/v1/studierichting';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  findAll(): Observable<StudierichtingInterface[]> {
    return this.http.get<StudierichtingInterface[]>(
      `${this.studierichtingUrl}`,
      { headers: this.headers },
    );
  }
}
