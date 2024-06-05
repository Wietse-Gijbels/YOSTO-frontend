import { ApplicationRef, Component, NgZone, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';
import { selectLookerError } from '../../store/selectors/auth.selectors';
import { BehaviorSubject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { StudierichtingService } from '../../common/service/studierichting.service';

@Component({
  selector: 'app-study-looker-registreer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GebruikerHeaderComponent,
    NgIf,
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './study-looker-registreer.component.html',
  styleUrls: ['./study-looker-registreer.component.scss'],
})
export class StudyLookerRegistreerComponent implements OnInit {
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
    });

    this.store.select(selectLookerError).subscribe((errorMessages) => {
      this.errorMessages$.next(errorMessages);
      this.updateFormErrors(errorMessages);
    });
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
            return this.studierichtingService.getFilteredRichtingen(value);
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

  onSubmit(): void {
    this.clearErrorMessages();

    const formData = this.form.getRawValue();

    if (formData.wachtwoord !== formData.bevestigWachtwoord) {
      this.errorMessages$.next({
        errorWachtwoordDubbel: 'Wachtwoorden komen niet overeen.',
      });
      return;
    }

    const formDataWithRole = {
      ...formData,
      rol: 'STUDYLOOKER',
    };

    this.store.dispatch(
      AuthActions.registerLooker({
        formData: formDataWithRole,
        role: 'STUDYLOOKER',
      }),
    );
  }

  onRichtingClick(richting: string) {
    this.form.get('huidigeStudieAndNiveau')!.setValue(richting);
    this.filteredRichtingen = [];
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
