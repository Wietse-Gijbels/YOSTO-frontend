import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StudierichtingInterface } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class StudierichtingService {
  private studierichtingUrl = 'http://localhost:8080/api/v1/studierichting';

  constructor(private http: HttpClient) {}

  findAll(): Observable<StudierichtingInterface[]> {
    return this.http.get<StudierichtingInterface[]>(
      `${this.studierichtingUrl}`,
    );
  }
}
