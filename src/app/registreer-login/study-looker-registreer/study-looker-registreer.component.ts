import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';
import { selectLookerError } from '../../store/selectors/auth.selectors';
import { Observable, of } from 'rxjs';
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
  form = this.formBuilder.nonNullable.group({
    voornaam: ['', Validators.required],
    achternaam: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    wachtwoord: ['', Validators.required],
    bevestigWachtwoord: ['', Validators.required],
    woonplaats: ['', Validators.required],
    huidigeStudieAndNiveau: [''],
  });

  errorMessages$: Observable<{ [key: string]: string } | null>;
  filteredRichtingen: string[] = [];
  borderRadiusStudie: string = 'normale-radius';

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private cookieService: CookieService,
    private studierichtingService: StudierichtingService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.errorMessages$ = this.store.select(selectLookerError);
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

    this.errorMessages$.subscribe(() => {
      this.cdRef.detectChanges();
    });
  }

  onSubmit(): void {
    this.clearErrorMessages();

    const formData = this.form.getRawValue();

    if (formData.wachtwoord !== formData.bevestigWachtwoord) {
      this.errorMessages$ = of({
        errorWachtwoordDubbel: 'Wachtwoorden komen niet overeen.',
      });
      this.cdRef.detectChanges(); // Trigger change detection
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
    console.log(this.errorMessages$);
  }

  onRichtingClick(richting: string) {
    this.form.get('huidigeStudieAndNiveau')!.setValue(richting);
    this.filteredRichtingen = [];
  }

  private clearErrorMessages() {
    this.errorMessages$ = of({});
    this.cdRef.detectChanges(); // Trigger change detection
  }
}
