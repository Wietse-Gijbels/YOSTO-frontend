import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookerQueueInterface } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LookerQueueService {
  constructor(private http: HttpClient) {}

  getFirstLooker(userId: string): Observable<{ looker: LookerQueueInterface }> {
    return this.http.get<{ looker: LookerQueueInterface }>(
      `http://localhost:8080/api/v1/lookerQueue/getFirstLooker?userId=${userId}`,
    );
  }

  getAmountOfLookers(): Observable<{ amount: number }> {
    return this.http.get<{ amount: number }>(
      'http://localhost:8080/api/v1/lookerQueue/getAmountOfLookers',
    );
  }

  joinQueue(
    lookerId: string,
    studierichtingId: string,
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      'http://localhost:8080/api/v1/lookerQueue/joinQueue',
      null,
      {
        params: {
          lookerId: lookerId,
          studierichtingId: studierichtingId,
        },
      },
    );
  }
}
