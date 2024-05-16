import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {RegistreerResponse} from "../../models/interfaces";
import {GebruikerHeaderComponent} from "../gebruiker-header/gebruiker-header.component";

@Component({
  selector: 'app-study-helper-registreer',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    GebruikerHeaderComponent
  ],
  templateUrl: './study-helper-registreer.component.html',
  styleUrl: './study-helper-registreer.component.scss'
})
export class StudyHelperRegistreerComponent {
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
