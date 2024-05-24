import { Component, OnInit } from '@angular/core';
import { GeschenkCategorie } from '../../models/interfaces';
import { GeschenkService } from '../../service/geschenk.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { GebruikerHeaderComponent } from '../../gebruiker/gebruiker-header/gebruiker-header.component';
import { NavBarComponent } from '../../navigation/nav-bar.component';

@Component({
  selector: 'app-geschenk-info',
  standalone: true,
  imports: [NgIf, GebruikerHeaderComponent, NavBarComponent],
  templateUrl: './geschenk-info.component.html',
  styleUrl: './geschenk-info.component.scss',
})
export class GeschenkInfoComponent implements OnInit {
  geschenkCategorie: GeschenkCategorie | null = null;

  constructor(
    private route: ActivatedRoute,
    private geschenkService: GeschenkService,
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
}
