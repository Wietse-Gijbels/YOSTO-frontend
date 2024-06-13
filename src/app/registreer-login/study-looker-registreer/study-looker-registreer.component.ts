import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../common/service/auth.service';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';
import { StudierichtingService } from '../../common/service/studierichting.service';
import { GebruikerRol } from '../../common/models/interfaces';
import { GebruikerService } from '../../common/service/gebruiker.service';

@Component({
  selector: 'app-study-looker-registreer',
  standalone: true,
  imports: [ReactiveFormsModule, GebruikerHeaderComponent, NgIf, NgForOf],
  templateUrl: './study-looker-registreer.component.html',
  styleUrls: ['./study-looker-registreer.component.scss'],
})
export class StudyLookerRegistreerComponent {
  form = this.formBuilder.nonNullable.group({
    voornaam: [''],
    achternaam: [''],
    email: [''],
    wachtwoord: [''],
    bevestigWachtwoord: [''],
    woonplaats: [''],
    huidigeStudieAndNiveau: [''],
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
    if (this.form.invalid) {
      return;
    }

    this.clearErrorMessages();

    const formData = this.form.getRawValue();

    if (formData.wachtwoord !== formData.bevestigWachtwoord) {
      this.errorMessages = {
        errorWachtwoordDubbel: 'Wachtwoorden komen niet overeen.',
      };
      return;
    }

    const formDataWithRole = {
      ...formData,
      rol: [GebruikerRol.STUDYLOOKER], // STUDYLOOKER als rol setten
    };

    this.authService.registreerLooker(formDataWithRole).subscribe(
      (response) => {
        // Verwerk succesvolle registratie
        this.cookieService.set('token', response.token);
        this.gebruikerService.setHeaders();
        this.router.navigateByUrl('/verify');
        this.authService.setRol(GebruikerRol.STUDYLOOKER);
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

  onRichtingClick(richting: string) {
    this.form.get('huidigeStudieAndNiveau')!.setValue(richting);
    this.filteredRichtingen = [];
  }

  private clearErrorMessages() {
    this.errorMessages = {};
  }
}
