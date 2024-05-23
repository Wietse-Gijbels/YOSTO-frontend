import { Component, OnInit } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { MatGridList } from '@angular/material/grid-list';
import { GebruikerService } from '../service/gebruiker.service';
import { CookieService } from 'ngx-cookie-service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GebruikerInterface } from '../models/interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    email: [''],
    woonplaats: [''],
  });
  protected readonly faUser = faUser;

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
  }

  save() {
    const fromData = this.form.getRawValue();
    this.gebruikerService
      .updateGebruiker(this.cookieService.get('token'), fromData)
      .subscribe(() => {
        this.edit = true;
      });
    this.gebruiker$ = this.gebruikerService.getGebruiker(
      this.cookieService.get('token'),
    );
  }

  editGebruiker() {
    this.edit = !this.edit;
  }
}
