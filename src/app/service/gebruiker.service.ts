import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GebruikerInterface} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class GebruikerService {

  constructor(private http: HttpClient) {
  }

  getAllConectedGebruikers(): Observable<GebruikerInterface[]> {
    return this.http.get<GebruikerInterface[]>('http://localhost:8080/api/v1/gebruiker/online');
  }

  getGebruikerByEmail(email: string): Observable<GebruikerInterface> {
    return this.http.get<GebruikerInterface>(`http://localhost:8080/api/v1/gebruiker/${email}`);
  }

  getGebruikerById(id: string): Observable<GebruikerInterface> {
    return this.http.get<GebruikerInterface>(`http://localhost:8080/api/v1/gebruiker/id/${id}`);
  }

}
