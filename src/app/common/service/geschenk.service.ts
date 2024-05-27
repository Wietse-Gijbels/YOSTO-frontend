import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Geschenk, GeschenkCategorie } from '../models/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GeschenkService {
  private apiUrl = 'http://localhost:8080/api/v1/geschenk';
  private categorieApiUrl = 'http://localhost:8080/api/v1/geschenkcategorie';

  constructor(private http: HttpClient) {}

  createGeschenk(geschenk: Geschenk): Observable<Geschenk> {
    return this.http.post<Geschenk>(`${this.apiUrl}/create`, geschenk);
  }

  getAllGeschenken(): Observable<Geschenk[]> {
    return this.http.get<Geschenk[]>(`${this.apiUrl}/all`);
  }

  addGeschenkToGebruiker(
    gebruikerId: string,
    geschenkCategorieId: string,
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/addToGebruiker/${gebruikerId}/${geschenkCategorieId}`,
      {},
    );
  }

  createGeschenkCategorie(uploadData: FormData): Observable<GeschenkCategorie> {
    return this.http.post<GeschenkCategorie>(
      `${this.categorieApiUrl}/create`,
      uploadData,
    );
  }

  getAllGeschenkCategorieen(): Observable<GeschenkCategorie[]> {
    return this.http.get<GeschenkCategorie[]>(`${this.categorieApiUrl}/all`);
  }

  getAllGeschenkCategorieenBeschikbaar(): Observable<GeschenkCategorie[]> {
    return this.http.get<GeschenkCategorie[]>(
      `${this.categorieApiUrl}/all-beschikbaar`,
    );
  }

  getGeschenkCategorieById(id: string): Observable<GeschenkCategorie> {
    return this.http.get<GeschenkCategorie>(`${this.categorieApiUrl}/${id}`);
  }
}
