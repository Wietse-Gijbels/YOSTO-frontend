import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { GebruikerHeaderComponent } from '../gebruiker-header/gebruiker-header.component';

@Component({
  selector: 'app-study-looker-registreer',
  standalone: true,
  imports: [ReactiveFormsModule, GebruikerHeaderComponent],
  templateUrl: './study-looker-registreer.component.html',
  styleUrl: './study-looker-registreer.component.scss',
})
export class StudyLookerRegistreerComponent {
  form = this.formBuilder.nonNullable.group({
    voornaam: ['', Validators.required],
    achternaam: ['', Validators.required],
    email: ['', Validators.required],
    wachtwoord: ['', Validators.required],
    bevestigWachtwoord: ['', Validators.required],
    woonplaats: ['', Validators.required],
    huidigeStudie: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) {}

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const formData = this.form.getRawValue();

    if (formData.wachtwoord !== formData.bevestigWachtwoord) {
      // Handel het geval af waarin wachtwoordbevestiging niet overeenkomt
      return;
    }

    this.authService.registreer(formData);
  }
}
