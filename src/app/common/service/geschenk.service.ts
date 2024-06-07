import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Geschenk, GeschenkCategorie } from '../models/interfaces';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeschenkService {
  token: string = this.cookieService.get('token');
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `Bearer ${this.token}`,
    'Content-Type': 'application/json',
  });
  private apiUrl = environment.url + '/geschenk';
  private categorieApiUrl = environment.url + '/geschenkcategorie';

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}

  createGeschenk(geschenk: Geschenk): Observable<Geschenk> {
    return this.http.post<Geschenk>(`${this.apiUrl}/create`, geschenk, {
      headers: this.headers,
    });
  }

  getAllGeschenken(): Observable<Geschenk[]> {
    return this.http.get<Geschenk[]>(`${this.apiUrl}/all`, {
      headers: this.headers,
    });
  }

  addGeschenkToGebruiker(
    gebruikerId: string,
    geschenkCategorieId: string,
  ): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/addToGebruiker/${gebruikerId}/${geschenkCategorieId}`,
      {},
      { headers: this.headers },
    );
  }

  createGeschenkCategorie(uploadData: FormData): Observable<GeschenkCategorie> {
    return this.http.post<GeschenkCategorie>(
      `${this.categorieApiUrl}/create`,
      uploadData,
      { headers: this.headers },
    );
  }

  getAllGeschenkCategorieen(): Observable<GeschenkCategorie[]> {
    return this.http.get<GeschenkCategorie[]>(`${this.categorieApiUrl}/all`, {
      headers: this.headers,
    });
  }

  getAllGeschenkCategorieenBeschikbaar(): Observable<GeschenkCategorie[]> {
    return this.http.get<GeschenkCategorie[]>(
      `${this.categorieApiUrl}/all-beschikbaar`,
      { headers: this.headers },
    );
  }

  getGeschenkCategorieById(id: string): Observable<GeschenkCategorie> {
    return this.http.get<GeschenkCategorie>(`${this.categorieApiUrl}/${id}`, {
      headers: this.headers,
    });
  }
}
