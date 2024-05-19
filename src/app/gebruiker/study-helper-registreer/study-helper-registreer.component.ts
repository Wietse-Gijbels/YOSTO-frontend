import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { GebruikerHeaderComponent } from '../gebruiker-header/gebruiker-header.component';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-study-helper-registreer',
  standalone: true,
  imports: [ReactiveFormsModule, GebruikerHeaderComponent, NgForOf, NgIf],
  templateUrl: './study-helper-registreer.component.html',
  styleUrl: './study-helper-registreer.component.scss',
})
export class StudyHelperRegistreerComponent {
  form = this.formBuilder.nonNullable.group({
    voornaam: ['', Validators.required],
    achternaam: ['', Validators.required],
    email: ['', Validators.required],
    wachtwoord: ['', Validators.required],
    bevestigWachtwoord: ['', Validators.required],
    woonplaats: ['', Validators.required],
    huidigeStudie: [''],
    behaaldDiploma: [''],
    // huidigeStudie: ['', Validators.required], VALIDATOR AANZETTEN VANAF HET MOMENT DAT WE STUDIES KUNNEN OPHALEN
    // behaaldDiploma: ['', Validators.required], VALIDATOR AANZETTEN VANAF HET MOMENT DAT WE STUDIES KUNNEN OPHALEN
    toegevoegdDiploma: [''],
    // toegevoegdDiploma: ['', Validators.required], VALIDATOR AANZETTEN VANAF HET MOMENT DAT WE STUDIES KUNNEN OPHALEN
    behaaldeDiplomaArray: this.formBuilder.array([
      this.formBuilder.group({
        diploma: [''],
        // diploma: ['', Validators.required], VALIDATOR AANZETTEN VANAF HET MOMENT DAT WE STUDIES KUNNEN OPHALEN
      }),
    ]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {}

  get behaaldeDiplomaArray(): FormArray {
    return this.form.get('behaaldeDiplomaArray') as FormArray;
  }

  addDiplomaField(): void {
    this.behaaldeDiplomaArray.push(
      this.formBuilder.group({
        diploma: [''],
      }),
    );
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.getRawValue();

    if (formData.wachtwoord !== formData.bevestigWachtwoord) {
      // TODO Handel het geval af waarin wachtwoordbevestiging niet overeenkomt
      return;
    }

    const formDataWithRole = {
      ...formData,
      rol: 'STUDYHELPER', // STUDYHELPER als rol setten
    };
    this.authService.registreerHelper(formDataWithRole);
  }
}
