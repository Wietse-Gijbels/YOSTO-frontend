import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendConnectionService {

  private testUrl: string;

  constructor(private http: HttpClient) {
    this.testUrl = 'http://localhost:8080/api/v1/gebruiker';
  }

  getUserByEmail(email: string): Observable<any> {
    const url = `${this.testUrl}/${email}`;
    return this.http.get<any>(url);
  }

}
