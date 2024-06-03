import { Component, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { MatGridList } from '@angular/material/grid-list';
import { CookieService } from 'ngx-cookie-service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GebruikerInterface, GebruikerRol } from '../common/models/interfaces';
import { GebruikerService } from '../common/service/gebruiker.service';
import { NavBarComponent } from '../common/navigation/nav-bar.component';
import { rolChecker } from '../common/directives/rol-checker.directive';
import { rolStyle } from '../common/directives/rol-style.directive';

@Component({
  selector: 'app-persoonlijke-info',
  standalone: true,
  imports: [
    MatTable,
    FaIconComponent,
    MatGridList,
    MatFormField,
    MatLabel,
    MatInput,
    AsyncPipe,
    ReactiveFormsModule,
    NavBarComponent,
    rolChecker,
    rolStyle,
  ],
  templateUrl: './persoonlijke-info.component.html',
  styleUrl: './persoonlijke-info.component.scss',
})
export class PersoonlijkeInfoComponent implements OnInit {
  gebruiker$: Observable<GebruikerInterface> | undefined;
  edit: boolean = true;
  form: FormGroup = this.fromBuilder.group({
    voornaam: [''],
    achternaam: [''],
    woonplaats: [''],
    leeftijd: [0],
    geslacht: [''],
  });
  numbers: number[] = Array.from({ length: 101 }, (_, i) => i);
  protected readonly faUser = faUser;
  protected readonly GebruikerRol = GebruikerRol;

  constructor(
    private gebruikerService: GebruikerService,
    private cookieService: CookieService,
    private fromBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    this.gebruiker$ = this.gebruikerService.getGebruiker(
      this.cookieService.get('token'),
    );
    this.gebruiker$.subscribe((gebruiker) => {
      this.form.patchValue(gebruiker);
    });
    this.form.disable();
  }

  preventEnter(event: Event) {
    event.preventDefault();
  }

  save() {
    const fromData = this.form.getRawValue();
    this.gebruiker$ = this.gebruikerService.updateGebruiker(
      this.cookieService.get('token'),
      fromData,
    );
    this.edit = !this.edit;
    this.form.disable();
  }

  editGebruiker() {
    this.edit = !this.edit;
    this.form.enable();
  }

  cancel() {
    this.edit = !this.edit;
    this.form.disable();
    this.gebruiker$?.subscribe((gebruiker) => {
      this.form.patchValue(gebruiker);
    });
  }
}
