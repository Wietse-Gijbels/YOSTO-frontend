import { Component, OnInit } from '@angular/core';
import { GeschenkService } from '../../service/geschenk.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { GeschenkCategorie } from '../../common/models/interfaces';
import { GebruikerService } from '../../common/service/gebruiker.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-geschenk-info',
  standalone: true,
  imports: [NgIf, GebruikerHeaderComponent, NavBarComponent],
  templateUrl: './geschenk-info.component.html',
  styleUrl: './geschenk-info.component.scss',
})
export class GeschenkInfoComponent implements OnInit {
  geschenkCategorie: GeschenkCategorie | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private geschenkService: GeschenkService,
    private gebruikerService: GebruikerService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.geschenkService
        .getGeschenkCategorieById(id)
        .subscribe((data: GeschenkCategorie) => {
          this.geschenkCategorie = data;
        });
    }
  }

  claimGeschenk(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gebruikerService
        .getGebruikerIdByToken(this.gebruikerService.token)
        .subscribe((gebruikerId: string) => {
          this.geschenkService
            .addGeschenkToGebruiker(gebruikerId, id)
            .subscribe(
              () => {
                this.successMessage = 'GESCHENK GECLAIMED';
                this.errorMessage = null;
              },
              (error: HttpErrorResponse) => {
                this.errorMessage =
                  error.error.gebruikerGeschenk ||
                  'Er is een fout opgetreden bij het claimen van het geschenk.';
                this.successMessage = null;
              },
            );
        });
    }
  }

  getAvailableGeschenkenCount(): number {
    return (
      this.geschenkCategorie?.geschenken.filter((g) => g.beschikbaar).length ||
      0
    );
  }
}
