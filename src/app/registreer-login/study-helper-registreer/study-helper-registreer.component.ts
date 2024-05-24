import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../common/service/auth.service';
import { Router } from '@angular/router';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { NgForOf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-study-helper-registreer',
  standalone: true,
  imports: [ReactiveFormsModule, GebruikerHeaderComponent, NgForOf],
  templateUrl: './study-helper-registreer.component.html',
  styleUrls: ['./study-helper-registreer.component.scss'],
})
export class StudyHelperRegistreerComponent {
  form = this.formBuilder.nonNullable.group({
    voornaam: ['', Validators.required],
    achternaam: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    wachtwoord: ['', Validators.required],
    bevestigWachtwoord: ['', Validators.required],
    woonplaats: ['', Validators.required],
    huidigeStudie: [''],
    behaaldDiploma: [''],
    toegevoegdDiploma: [''],
    behaaldeDiplomaArray: this.formBuilder.array([
      this.formBuilder.group({
        diploma: [''],
      }),
    ]),
  });

  errorMessages: { [key: string]: string } = {};

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
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
    this.clearErrorMessages();

    const formData = this.form.getRawValue();

    if (formData.wachtwoord !== formData.bevestigWachtwoord) {
      this.errorMessages = {
        errorWachtwoordDubbel: 'Wachtwoorden komen niet overeen.',
      };
    }

    const formDataWithRole = {
      ...formData,
      rol: 'STUDYHELPER', // STUDYHELPER als rol setten
    };

    this.authService.registreerHelper(formDataWithRole).subscribe(
      (response) => {
        // Verwerk succesvolle registratie
        this.cookieService.set('token', response.token);
        this.router.navigateByUrl('/home');
      },
      (error) => {
        if (error.error) {
          this.errorMessages = { ...error.error, ...this.errorMessages };
        } else {
          this.errorMessages = {
            errorRegistreer: 'Er is een fout opgetreden bij het registreren.',
          };
        }
      },
    );
  }

  private clearErrorMessages() {
    this.errorMessages = {};
  }
}
