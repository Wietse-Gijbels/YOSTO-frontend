import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { GebruikerInterface } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GebruikerService {
  constructor(private http: HttpClient) {}

  getAllConectedGebruikers(): Observable<GebruikerInterface[]> {
    return this.http.get<GebruikerInterface[]>(
      'http://localhost:8080/api/v1/gebruiker/online',
    );
  }

  getGebruikerIdByToken(token: string): Observable<string> {
    return this.http
      .get<{ id: string }>(`http://localhost:8080/api/v1/gebruiker/id/${token}`)
      .pipe(map((response) => response.id));
  }

  getGebruikerById(id: string): Observable<GebruikerInterface> {
    return this.http.get<GebruikerInterface>(
      `http://localhost:8080/api/v1/gebruiker/gebruiker/${id}`,
    );
  }
}
