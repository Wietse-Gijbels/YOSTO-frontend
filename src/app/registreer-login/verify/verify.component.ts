import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { AuthService } from '../../common/service/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [FormsModule, GebruikerHeaderComponent, ReactiveFormsModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss',
})
export class VerifyComponent implements OnInit {
  form = this.formBuilder.nonNullable.group({
    email: [''],
    code: [''],
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
    this.authService.verify(formData.email, formData.code).subscribe(
      (response) => {
        this.router.navigateByUrl('/login');
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

  ngOnInit(): void {
    this.cookieService.delete('token');
  }
}
