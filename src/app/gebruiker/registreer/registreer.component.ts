import {Component, Inject, inject} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {GebruikerInterface, RegistreerResponse} from "../../models/interfaces";
import {response} from "express";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {routes} from "../../app.routes";
@Component({
  selector: 'app-registreer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './registreer.component.html',
  styleUrl: './registreer.component.scss'
})

export class RegistreerComponent {

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
    ) {
  }


  form = this.formBuilder.nonNullable.group({
    email: ['', Validators. required],
    wachtwoord: ['', Validators.required],
  });
  onSubmit(): void {
    const formData = this.form.getRawValue();
    this.httpClient.post<RegistreerResponse>(
      'http://localhost:8080/api/v1/auth/registreer',
      formData,
      ).subscribe((response) => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/');
      })
  }
}
