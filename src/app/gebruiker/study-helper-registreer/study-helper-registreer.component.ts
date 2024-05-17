import {Component} from '@angular/core';
import {FormArray, FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {RegistreerResponse} from "../../models/interfaces";
import {GebruikerHeaderComponent} from "../gebruiker-header/gebruiker-header.component";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-study-helper-registreer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GebruikerHeaderComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './study-helper-registreer.component.html',
  styleUrl: './study-helper-registreer.component.scss'
})
export class StudyHelperRegistreerComponent {
  form = this.formBuilder.nonNullable.group({
    voornaam: ['', Validators.required],
    achternaam: ['', Validators.required],
    email: ['', Validators.required],
    wachtwoord: ['', Validators.required],
    bevestigWachtwoord: ['', Validators.required],
    provincie: ['', Validators.required],
    huidigeStudie: ['', Validators.required],
    behaaldDiploma: ['', Validators.required],
    toegevoegdDiploma: ['', Validators.required],
    behaaldeDiplomaArray: this.formBuilder.array([
      this.formBuilder.group({
        diploma: ['', Validators.required]
      })
    ])
  });

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  get behaaldeDiplomaArray(): FormArray {
    return this.form.get('behaaldeDiplomaArray') as FormArray;
  }

  addDiplomaField(): void {
    this.behaaldeDiplomaArray.push(this.formBuilder.group({
      diploma: ['', Validators.required]
    }));
  }

  onSubmit(): void {
    const formData = this.form.getRawValue();

    const toegevoegdDiploma = formData.toegevoegdDiploma;
    if (toegevoegdDiploma) {
      this.behaaldeDiplomaArray.push(this.formBuilder.group({
        diploma: [toegevoegdDiploma, Validators.required]
      }));
    }

    this.httpClient.post<RegistreerResponse>(
      'http://localhost:8080/api/v1/auth/registreer',
      formData,
    ).subscribe((response) => {
      localStorage.setItem('token', response.token);
      this.router.navigateByUrl('/');
    })
  }
}
