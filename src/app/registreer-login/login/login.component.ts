import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../common/service/auth.service';
import { Router } from '@angular/router';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { CookieService } from 'ngx-cookie-service';
import { GebruikerService } from '../../common/service/gebruiker.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, GebruikerHeaderComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
    private gebruikerService: GebruikerService,
  ) {}

  onSubmit(): void {
    const formData = this.form.getRawValue();
    this.authService.login(formData).subscribe(
      (response) => {
        this.cookieService.set('token', response.token, { expires: 1 });
        // this.gebruikerService.setHeaders();
        this.router.navigateByUrl('/home');
        this.authService.setRol(response.rol);
        this.cookieService.set('rol', response.rol);
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

  goToVerify(): void {
    this.router.navigateByUrl('/verify');
  }

  ngOnInit(): void {
    this.cookieService.delete('token');
  }
}
