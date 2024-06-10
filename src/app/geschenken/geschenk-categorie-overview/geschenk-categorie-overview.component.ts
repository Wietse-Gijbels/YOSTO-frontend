import { Component, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { GeschenkService } from '../../common/service/geschenk.service';
import { Router } from '@angular/router';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import {
  GebruikerInterface,
  GeschenkCategorie,
} from '../../common/models/interfaces';
import { GebruikerService } from '../../common/service/gebruiker.service';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

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
  geschenkCategorieen: GeschenkCategorie[] = [];
  backgroundColorClasses: string[] = [];
  gebruiker$: Observable<GebruikerInterface> | undefined;

  categorieColors = [
    'categorie-color-100',
    'categorie-color-200',
    'categorie-color-300',
    'categorie-color-400',
    'categorie-color-500',
    'categorie-color-600',
    'categorie-color-700',
  ];

  constructor(
    private geschenkService: GeschenkService,
    private router: Router,
    private gebruikerService: GebruikerService,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.loadGeschenkCategorieen();
    this.gebruiker$ = this.gebruikerService.getGebruiker(
      this.cookieService.get('token'),
    );
  }

  assignColorsToCategories(): void {
    this.backgroundColorClasses = this.geschenkCategorieen.map(
      (_, index) => this.categorieColors[index % this.categorieColors.length],
    );
  }

  loadGeschenkCategorieen(): void {
    this.geschenkService
      .getAllGeschenkCategorieenBeschikbaar()
      .subscribe((data: GeschenkCategorie[]) => {
        this.geschenkCategorieen = data;
        this.assignColorsToCategories(); // Assign colors after data is loaded
      });
  }

  meerInfo(id: string): void {
    this.router.navigate(['/geschenk-info', id]);
  }
}
