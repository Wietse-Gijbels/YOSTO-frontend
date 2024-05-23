import { Component, OnInit } from '@angular/core';
import { GeschenkCategorie } from '../../models/interfaces';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { NavBarComponent } from '../../navigation/nav-bar.component';
import { GebruikerHeaderComponent } from '../../gebruiker/gebruiker-header/gebruiker-header.component';
import { FormsModule } from '@angular/forms';
import { GeschenkService } from '../../service/geschenk.service';

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
  geschenkCategorieen: GeschenkCategorie[] = [];

  constructor(private geschenkService: GeschenkService) {}

  ngOnInit(): void {
    this.loadGeschenkCategorieen();
  }

  loadGeschenkCategorieen(): void {
    this.geschenkService
      .getAllGeschenkCategorieen()
      .subscribe((data: GeschenkCategorie[]) => {
        this.geschenkCategorieen = data;
      });
  }

  meerInfo(categorie: GeschenkCategorie): void {
    // Implement the function to show more info
  }
}
