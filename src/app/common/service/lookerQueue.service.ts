import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LookerQueueService {
  constructor(private http: HttpClient) {}

  private url = environment.url + '/lookerQueue';

  getFirstLooker(userId: string): Observable<{ lookerId: string }> {
    return this.http.get<{ lookerId: string }>(
      this.url + `/getFirstLooker?userId=${userId}`,
    );
  }

  getAmountOfLookers(): Observable<{ amount: number }> {
    return this.http.get<{ amount: number }>(this.url + '/getAmountOfLookers');
  }

  joinQueue(
    lookerId: string,
    studierichtingId: string,
  ): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(this.url + '/joinQueue', null, {
      params: {
        lookerId: lookerId,
        studierichtingId: studierichtingId,
      },
    });
  }
}
