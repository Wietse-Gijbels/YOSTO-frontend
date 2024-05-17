import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistreerResponse } from '../../models/interfaces';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { GebruikerHeaderComponent } from '../gebruiker-header/gebruiker-header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GebruikerHeaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {}

  form = this.formBuilder.nonNullable.group({
    email: ['', Validators.required],
    wachtwoord: ['', Validators.required],
  });

  onSubmit(): void {
    const formData = this.form.getRawValue();
    this.httpClient
      .post<RegistreerResponse>(
        'http://localhost:8080/api/v1/auth/login',
        formData,
      )
      .subscribe((response) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/');
      });
  }
}
