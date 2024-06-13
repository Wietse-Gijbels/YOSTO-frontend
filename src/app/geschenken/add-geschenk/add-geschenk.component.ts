import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeschenkService } from '../../common/service/geschenk.service';
import { NgForOf, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { GeschenkCategorie } from '../../common/models/interfaces';

@Component({
  selector: 'app-add-geschenk',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NavBarComponent,
    GebruikerHeaderComponent,
    NgIf,
    NgForOf,
  ],
  templateUrl: './add-geschenk.component.html',
  styleUrls: ['./add-geschenk.component.scss'],
})
export class AddGeschenkComponent {
  form: FormGroup;
  errorMessages: { [key: string]: string } = {};
  geschenkCategorieen: GeschenkCategorie[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private geschenkService: GeschenkService,
    private router: Router,
  ) {
    this.form = this.formBuilder.group({
      titel: [''],
      code: [''],
      isBeschikbaar: [true],
      geschenkCategorie: [''],
    });

    this.loadGeschenkCategorieen();
  }

  loadGeschenkCategorieen(): void {
    this.geschenkService.getAllGeschenkCategorieen().subscribe((categories) => {
      this.geschenkCategorieen = categories;
    });
  }

  onSubmit(): void {
    this.clearErrorMessages();

    const titel = this.form.get('titel')?.value;
    const code = this.form.get('code')?.value;
    const beschikbaar = this.form.get('isBeschikbaar')?.value;
    const geschenkCategorieId = this.form.get('geschenkCategorie')?.value;

    const geschenkCategorie = this.geschenkCategorieen.find(
      (cat) => cat.id === geschenkCategorieId,
    );

    if (titel && code && geschenkCategorie) {
      const newGeschenk = {
        titel,
        code,
        beschikbaar,
        geschenkCategorie,
      };

      this.geschenkService.createGeschenk(newGeschenk).subscribe(
        (response) => {
          this.form.reset();
        },
        (error) => {
          this.errorMessages = error.error;
        },
      );
    } else {
      this.errorMessages['createGeschenk'] = 'Vul alle velden correct in!';
    }
  }

  private clearErrorMessages() {
    this.errorMessages = {};
  }
}
