import {HttpClient} from '@angular/common/http';
import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationResponse} from "../../models/interfaces";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  form = this.formBuilder.nonNullable.group({
    email: ['', Validators.required],
    wachtwoord: ['', Validators.required],
  });

  onSubmit(): void {
    const formData = this.form.getRawValue();
    this.httpClient.post<AuthenticationResponse>(
      'http://localhost:8080/api/v1/auth/login',
      formData,
    ).subscribe((response) => {
      localStorage.setItem('token', response.token);
      this.router.navigateByUrl('/');
    })
  }
}
