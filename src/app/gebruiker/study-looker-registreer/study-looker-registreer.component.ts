import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { GebruikerHeaderComponent } from '../gebruiker-header/gebruiker-header.component';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-study-looker-registreer',
  standalone: true,
  imports: [ReactiveFormsModule, GebruikerHeaderComponent],
  templateUrl: './study-looker-registreer.component.html',
  styleUrl: './study-looker-registreer.component.scss',
})
export class StudyLookerRegistreerComponent {
  form = this.formBuilder.nonNullable.group({
    voornaam: [''],
    achternaam: [''],
    email: [''],
    wachtwoord: [''],
    bevestigWachtwoord: [''],
    woonplaats: [''],
    huidigeStudie: [''],
  });

  errorMessages: { [key: string]: string } = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

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
    }

    const formDataWithRole = {
      ...formData,
      rol: 'STUDYLOOKER', // STUDYLOOKER als rol setten
    };

    this.authService.registreerLooker(formDataWithRole).subscribe(
      (response) => {
        // Verwerk succesvolle registratie
        this.cookieService.set('token', response.token);
        this.router.navigateByUrl('/');
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
