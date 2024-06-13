import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { AuthService } from '../../common/service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { rolStyle } from '../../common/directives/rol-style.directive';
import { GebruikerService } from '../../common/service/gebruiker.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [
    FormsModule,
    GebruikerHeaderComponent,
    ReactiveFormsModule,
    rolStyle,
  ],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
})
export class VerifyComponent implements OnInit {
  form = this.formBuilder.nonNullable.group({
    email: [''],
    wachtwoord: [''],
    code: [''],
  });

  errorMessages: { [key: string]: string } = {};
  email?: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
    private gebruikerService: GebruikerService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.cookieService.delete('token');
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      if (this.email) {
        this.form.controls.email.setValue(this.email);
      }
    });
  }

  onSubmit(): void {
    const formData = this.form.getRawValue();
    this.authService.verify(formData.email, formData.code).subscribe(
      (response) => {
        this.authService.login(formData).subscribe(
          (response) => {
            this.cookieService.set('token', response.token, { expires: 1 });
            this.gebruikerService.setHeaders();
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
      },
      (error) => {
        if (error.error) {
          this.errorMessages = error.error;
        } else {
          this.errorMessages = {
            errorVerify: 'Er is een fout opgetreden bij het verifiëren',
          };
        }
      },
    );
  }
}
