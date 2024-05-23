import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GeschenkCategorie } from '../../models/interfaces';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavBarComponent } from '../../navigation/nav-bar.component';
import { GebruikerHeaderComponent } from '../../gebruiker/gebruiker-header/gebruiker-header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-geschenk-categorie-overview',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    NavBarComponent,
    GebruikerHeaderComponent,
    FormsModule,
    NgOptimizedImage,
  ],
  templateUrl: './geschenk-categorie-overview.component.html',
  styleUrls: ['./geschenk-categorie-overview.component.scss'],
})
export class GeschenkCategorieOverviewComponent implements OnInit {
  selectedFile: File | null = null;
  naam: string = '';
  prijs: number = 0;
  beschrijving: string = '';
  geschenkCategorieen: any[] = []; // Update with the correct type

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadGeschenkCategorieen();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onUpload(): void {
    if (this.selectedFile) {
      const uploadData = new FormData();
      uploadData.append('file', this.selectedFile, this.selectedFile.name);
      uploadData.append('naam', this.naam);
      uploadData.append('prijs', this.prijs.toString());
      uploadData.append('beschrijving', this.beschrijving);

      this.http
        .post(
          'http://localhost:8080/api/v1/geschenkcategorie/create',
          uploadData,
        )
        .subscribe((response: any) => {
          console.log(response);
          this.loadGeschenkCategorieen(); // Refresh the list after upload
        });
    }
  }

  loadGeschenkCategorieen(): void {
    this.http
      .get<
        GeschenkCategorie[]
      >('http://localhost:8080/api/v1/geschenkcategorie/all-beschikbaar')
      .subscribe((data: GeschenkCategorie[]) => {
        this.geschenkCategorieen = data;
      });
  }

  meerInfo(categorie: any): void {
    // Implement the function to show more info
  }
}
