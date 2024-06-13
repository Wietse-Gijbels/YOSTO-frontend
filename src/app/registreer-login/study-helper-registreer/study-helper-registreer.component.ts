import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../common/service/auth.service';
import { Router } from '@angular/router';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { NgForOf, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { StudierichtingService } from '../../common/service/studierichting.service';
import { GebruikerRol } from '../../common/models/interfaces';
import { GebruikerService } from '../../common/service/gebruiker.service';

@Component({
  selector: 'app-study-helper-registreer',
  standalone: true,
  imports: [ReactiveFormsModule, GebruikerHeaderComponent, NgIf, NgForOf],
  templateUrl: './study-helper-registreer.component.html',
  styleUrls: ['./study-helper-registreer.component.scss'],
})
export class StudyHelperRegistreerComponent implements OnInit {
  form = this.formBuilder.nonNullable.group({
    voornaam: ['', Validators.required],
    achternaam: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    wachtwoord: ['', Validators.required],
    bevestigWachtwoord: ['', Validators.required],
    woonplaats: ['', Validators.required],
    huidigeStudieAndNiveau: [''],
    behaaldeDiplomaArray: this.formBuilder.array([
      this.formBuilder.group({
        diploma: [''],
        filteredRichtingen: [[]],
      }),
    ]),
  });

  errorMessages: { [key: string]: string } = {};
  filteredRichtingen: string[] = [];
  borderRadiusStudie: string = 'normale-radius';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private studierichtingService: StudierichtingService,
    private gebruikerService: GebruikerService,
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

    this.setupDiplomaFieldSubscriptions();
  }

  setupDiplomaFieldSubscriptions() {
    this.behaaldeDiplomaArray.controls.forEach((control, index) => {
      const diplomaControl = control.get('diploma');
      diplomaControl!.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((value) => {
            if (value) {
              return this.studierichtingService.getFilteredHogerOnderwijsRichtingen(
                value,
              );
            } else {
              return of([]);
            }
          }),
        )
        .subscribe((richtingen) => {
          (this.behaaldeDiplomaArray.at(index) as any).patchValue(
            {
              filteredRichtingen: richtingen,
            },
            { emitEvent: false },
          );
        });
    });
  }

  addDiplomaField(): void {
    // Check if the last diploma field has a value before adding a new one
    const lastDiplomaControl = this.behaaldeDiplomaArray.at(
      this.behaaldeDiplomaArray.length - 1,
    );
    if (lastDiplomaControl && lastDiplomaControl.get('diploma')!.value) {
      const newField = this.formBuilder.group({
        diploma: [''],
        filteredRichtingen: [[]],
      });
      this.behaaldeDiplomaArray.push(newField);

      // Add subscription for the new field
      const index = this.behaaldeDiplomaArray.length - 1;
      const diplomaControl = newField.get('diploma');
      diplomaControl!.valueChanges
        .pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((value) => {
            if (value) {
              return this.studierichtingService.getFilteredHogerOnderwijsRichtingen(
                value,
              );
            } else {
              return of([]);
            }
          }),
        )
        .subscribe((richtingen) => {
          (this.behaaldeDiplomaArray.at(index) as any).patchValue(
            {
              filteredRichtingen: richtingen,
            },
            { emitEvent: false },
          );
        });
    } else {
      // Optionally show a message to the user indicating the need to fill the previous field
      console.warn(
        'Please fill the previous diploma field before adding a new one.',
      );
    }
  }

  onSubmit(): void {
    this.clearErrorMessages();

    const formData = this.form.getRawValue();
    if (formData.wachtwoord !== formData.bevestigWachtwoord) {
      this.errorMessages = {
        errorWachtwoordDubbel: 'Wachtwoorden komen niet overeen.',
      };
    }

    const behaaldeDiplomas = formData.behaaldeDiplomaArray.map(
      (d: any) => d.diploma,
    );

    const formDataWithRole = {
      ...formData,
      rol: [GebruikerRol.STUDYHELPER],
      behaaldeDiplomas, // STUDYHELPER als rol setten
    };
    this.authService.registreerHelper(formDataWithRole).subscribe(
      (response) => {
        // Verwerk succesvolle registratie
        this.cookieService.set('token', response.token);
        this.gebruikerService.setHeaders();
        this.router.navigateByUrl(`/verify?email=${formData.email}`);
        this.authService.setRol(GebruikerRol.STUDYHELPER);
        this.cookieService.set('rol', GebruikerRol.STUDYHELPER);
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

  onRichtingClick(richting: string, diplomaIndex?: number) {
    if (diplomaIndex !== undefined) {
      this.behaaldeDiplomaArray
        .at(diplomaIndex)
        .get('diploma')!
        .setValue(richting);
      (this.behaaldeDiplomaArray.at(diplomaIndex) as any).patchValue(
        {
          filteredRichtingen: [],
        },
        { emitEvent: false },
      );
    } else {
      this.form.get('huidigeStudieAndNiveau')!.setValue(richting);
      this.filteredRichtingen = [];
    }
  }

  hasFilteredRichtingen(diploma: AbstractControl<any>): boolean {
    const richtingen = diploma.get('filteredRichtingen')?.value;
    return Array.isArray(richtingen) && richtingen.length > 0;
  }

  private clearErrorMessages() {
    this.errorMessages = {};
  }
}
