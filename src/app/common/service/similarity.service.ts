// similarity.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:8080/api/v1/studierichtingWaardes';

  constructor(private http: HttpClient) {}

  calculateSimilarity(
    userValues: UserValuesDto,
  ): Observable<StudierichtingSimilarityDto[]> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<StudierichtingSimilarityDto[]>(
      `${this.apiUrl}/similarity`,
      userValues,
      { headers },
    );
  }

  getStudierichtingWaardesById(studierichtingId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${studierichtingId}`);
  }
}
