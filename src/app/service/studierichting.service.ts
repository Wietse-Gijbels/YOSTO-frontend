import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { StudierichtingInterface } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class StudierichtingService {
  private studierichtingUrl = 'http://localhost:8080/api/v1/studierichting';

  constructor(private http: HttpClient) {}

  findAll(
    page: number,
    pageSize: number,
  ): Observable<{ totalElements: number; content: StudierichtingInterface[] }> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<{
      totalElements: number;
      content: StudierichtingInterface[];
    }>(this.studierichtingUrl, { params });
  }
}
