import { Component, OnInit } from '@angular/core';
import { StudyHelperRegistreerComponent } from '../study-helper-registreer/study-helper-registreer.component';
import { StudyLookerRegistreerComponent } from '../study-looker-registreer/study-looker-registreer.component';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-registreer',
  standalone: true,
  imports: [
    CommonModule,
    StudyHelperRegistreerComponent,
    StudyLookerRegistreerComponent,
    GebruikerHeaderComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
  ],
  templateUrl: './registreer.component.html',
  styleUrl: './registreer.component.scss',
})
export class RegistreerComponent implements OnInit {
  currentComponent: 'helper' | 'looker' = 'helper';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.clearToken()); // Verwijder de token wanneer de component wordt geïnitialiseerd

    this.route.queryParams.subscribe((params) => {
      const form = params['form'];
      this.currentComponent = form === 'helper' ? 'helper' : 'looker';
    });
    this.cookieService.delete('token');
  }

  toggleComponent(component: 'helper' | 'looker'): void {
    this.currentComponent = component;
    this.router.navigate(['/registreer']); // Zodat de url terug clean is
  }
}
