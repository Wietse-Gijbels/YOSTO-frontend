// src/app/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';
import { selectAuthError } from '../../store/selectors/auth.selectors';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { CookieService } from 'ngx-cookie-service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, GebruikerHeaderComponent, AsyncPipe, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form = this.formBuilder.nonNullable.group({
    email: [''],
    wachtwoord: [''],
  });

  errorMessages$: Observable<{ [key: string]: string } | null>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private router: Router,
    private cookieService: CookieService,
  ) {
    this.errorMessages$ = this.store.select(selectAuthError);
  }

  onSubmit(): void {
    const formData = this.form.getRawValue();
    this.store.dispatch(AuthActions.login({ formData }));
  }

  ngOnInit(): void {
    this.cookieService.delete('token');
  }
}
