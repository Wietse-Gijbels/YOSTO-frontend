// similarity.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

interface UserValuesDto {
  conventioneel: number;
  praktisch: number;
  analytisch: number;
  kunstzinnig: number;
  sociaal: number;
  ondernemend: number;
}

interface StudierichtingSimilarityDto {
  studierichtingId: string;
  naam: string;
  niveauNaam: string;
  conventioneel: number;
  praktisch: number;
  analytisch: number;
  kunstzinnig: number;
  sociaal: number;
  ondernemend: number;
  similarityPercentage: number;
}

@Injectable({
  providedIn: 'root',
})
export class SimilarityService {
  token: string = this.cookieService.get('token');
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });
  private apiUrl = 'http://localhost:8080/api/v1/studierichtingWaardes';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  calculateSimilarity(
    userValues: UserValuesDto,
  ): Observable<StudierichtingSimilarityDto[]> {
    return this.http.post<StudierichtingSimilarityDto[]>(
      `${this.apiUrl}/similarity`,
      userValues,
      { headers: this.headers },
    );
  }

  getStudierichtingWaardesById(studierichtingId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${studierichtingId}`, {
      headers: this.headers,
    });
  }
}
