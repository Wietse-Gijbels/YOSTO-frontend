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
import { NgForOf, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StudierichtingService } from '../../common/service/studierichting.service';

@Component({
  selector: 'app-study-helper-registreer',
  standalone: true,
  imports: [ReactiveFormsModule, GebruikerHeaderComponent, NgIf, NgForOf],
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
    huidigeStudieAndNiveau: [''],
    toegevoegdDiploma: [''],
    behaaldeDiplomaArray: this.formBuilder.array([
      this.formBuilder.group({
        diploma: [''],
      }),
    ]),
  });

  errorMessages: { [key: string]: string } = {};
  filteredRichtingen: string[] = [];
  borderRadiusStudie: string = 'normale-radius';

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private studierichtingService: StudierichtingService,
  ) {}

  get behaaldeDiplomaArray(): FormArray {
    return this.form.get('behaaldeDiplomaArray') as FormArray;
  }

  ngOnInit() {
    this.form
      .get('huidigeStudieAndNiveau')!
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          if (value) {
            this.borderRadiusStudie = 'aangepaste-radius';
            return this.studierichtingService.getFilteredHogerOnderwijsRichtingen(
              value,
            );
          } else {
            this.borderRadiusStudie = 'normale-radius';
            return of([]);
          }
        }),
      )
      .subscribe((richtingen) => {
        this.filteredRichtingen = richtingen;
      });
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

  onRichtingClick(richting: string) {
    this.form.get('huidigeStudieAndNiveau')!.setValue(richting);
    this.filteredRichtingen = [];
  }

  private clearErrorMessages() {
    this.errorMessages = {};
  }
}
