import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LookerQueueInterface } from '../models/interfaces';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LookerQueueService {
  private url = environment.url + '/lookerQueue';
  constructor(private http: HttpClient) {}

  getFirstLooker(userId: string): Observable<{ looker: LookerQueueInterface }> {
    return this.http.get<{ looker: LookerQueueInterface }>(
      this.url + `/getFirstLooker?userId=${userId}`,
    );
  }

  getAmountOfLookers(): Observable<{ amount: number }> {
    return this.http.get<{ amount: number }>(this.url + '/getAmountOfLookers');
  }

  getAmountOfLookersForMe(userId: string): Observable<{ amount: number }> {
    return this.http.get<{ amount: number }>(this.url + '/getAmountForMyStudierichtingen', {
      params: {
        userId: userId,
      },
    });
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
