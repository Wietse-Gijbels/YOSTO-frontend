import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LookerQueueService {
  constructor(private http: HttpClient) {}

  getFirstLooker(userId: string): Observable<{ lookerId: string }> {
    return this.http.get<{ lookerId: string }>(
      `http://localhost:8080/api/v1/lookerQueue/getFirstLooker?userId=${userId}`,
    );
  }

  getAmountOfLookers(): Observable<{ amount: number }> {
    // Ensure this matches the response structure
    return this.http.get<{ amount: number }>(
      'http://localhost:8080/api/v1/lookerQueue/getAmountOfLookers',
    );
  }
}
