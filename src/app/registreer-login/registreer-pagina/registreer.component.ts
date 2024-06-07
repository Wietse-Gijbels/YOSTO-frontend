import { Component } from '@angular/core';
import { StudyHelperRegistreerComponent } from '../study-helper-registreer/study-helper-registreer.component';
import { StudyLookerRegistreerComponent } from '../study-looker-registreer/study-looker-registreer.component';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { rolStyle } from '../../common/directives/rol-style.directive';

@Component({
  selector: 'app-registreer',
  standalone: true,
  imports: [
    StudyHelperRegistreerComponent,
    StudyLookerRegistreerComponent,
    GebruikerHeaderComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
    rolStyle,
  ],
  templateUrl: './registreer.component.html',
  styleUrl: './registreer.component.scss',
})
export class RegistreerComponent {
  currentComponent: 'helper' | 'looker' = 'helper';
  foto: string = '';
  class: string = 'helper-container';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const form = params['form'];
      this.currentComponent = form === 'helper' ? 'helper' : 'looker';
      this.class =
        this.currentComponent === 'helper'
          ? 'helper-container'
          : 'looker-container';
    });
    this.cookieService.delete('token');
  }

  toggleComponent(component: 'helper' | 'looker'): void {
    this.currentComponent = component;
    this.router.navigate(['/registreer']); // Zodat de url terug clean is
    if (component === 'helper') {
      this.foto = '../../../assets/images/helper-yosto-logo.png';
      this.class = 'helper-container';
    } else {
      this.foto = '../../../assets/images/looker-yosto-logo.png';
      this.class = 'looker-container';
    }
  }
}
