import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { GebruikerHeaderComponent } from '../gebruiker-header/gebruiker-header.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, GebruikerHeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form = this.formBuilder.nonNullable.group({
    email: [''],
    wachtwoord: [''],
  });

  errorMessages: { [key: string]: string } = {};

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  onSubmit(): void {
    const formData = this.form.getRawValue();
    this.authService.login(formData).subscribe(
      (response) => {
        this.cookieService.set('token', response.token);
        this.router.navigateByUrl('/');
      },
      (error) => {
        if (error.error) {
          this.errorMessages = error.error;
        } else {
          this.errorMessages = {
            errorLogin: 'Er is een fout opgetreden bij het inloggen',
          };
        }
      },
    );
  }
}
