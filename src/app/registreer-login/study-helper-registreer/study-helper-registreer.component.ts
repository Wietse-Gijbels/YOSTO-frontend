import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';
import { selectHelperError } from '../../store/selectors/auth.selectors';
import { BehaviorSubject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { StudierichtingService } from '../../common/service/studierichting.service';

@Component({
  selector: 'app-study-helper-registreer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GebruikerHeaderComponent,
    NgIf,
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './study-helper-registreer.component.html',
  styleUrls: ['./study-helper-registreer.component.scss'],
})
export class StudyHelperRegistreerComponent implements OnInit {
  form: FormGroup;
  errorMessages$ = new BehaviorSubject<{ [key: string]: string } | null>(null);
  filteredRichtingen: string[] = [];
  borderRadiusStudie: string = 'normale-radius';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private cookieService: CookieService,
    private studierichtingService: StudierichtingService,
    private cdRef: ApplicationRef,
    private ngZone: NgZone,
  ) {
    this.form = this.formBuilder.group({
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

    this.store.select(selectHelperError).subscribe((errorMessages) => {
      this.errorMessages$.next(errorMessages);
      this.updateFormErrors(errorMessages);
    });
  }

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
    const lastDiplomaControl = this.behaaldeDiplomaArray.at(
      this.behaaldeDiplomaArray.length - 1,
    );
    if (lastDiplomaControl && lastDiplomaControl.get('diploma')!.value) {
      const newField = this.formBuilder.group({
        diploma: [''],
        filteredRichtingen: [[]],
      });
      this.behaaldeDiplomaArray.push(newField);

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
      console.warn(
        'Please fill the previous diploma field before adding a new one.',
      );
    }
  }

  onSubmit(): void {
    this.clearErrorMessages();

    const formData = this.form.getRawValue();
    if (formData.wachtwoord !== formData.bevestigWachtwoord) {
      this.errorMessages$.next({
        errorWachtwoordDubbel: 'Wachtwoorden komen niet overeen.',
      });
    }

    const behaaldeDiplomas = formData.behaaldeDiplomaArray.map(
      (d: any) => d.diploma,
    );

    const formDataWithRole = {
      ...formData,
      rol: 'STUDYHELPER',
      behaaldeDiplomas,
    };
    this.store.dispatch(
      AuthActions.registerHelper({
        formData: formDataWithRole,
        role: 'STUDYHELPER',
      }),
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
    this.errorMessages$.next(null);
    this.updateFormErrors(null);
  }

  private updateFormErrors(errorMessages: { [key: string]: string } | null) {
    this.ngZone.run(() => {
      Object.keys(this.form.controls).forEach((key) => {
        const control = this.form.get(key);
        if (key === 'woonplaats') {
          key = 'provincie';
        } else if (key === 'huidigeStudieAndNiveau') {
          key = 'richtingParser';
        } else if (key === 'diploma') {
          key = 'diplomaParser';
        }
        if (control) {
          const errorKey = `error${key.charAt(0).toUpperCase() + key.slice(1)}`;
          if (errorMessages && errorMessages[errorKey]) {
            control.setErrors({ serverError: errorMessages[errorKey] });
          } else {
            control.setErrors(null);
          }
        }
      });
    });
  }
}
