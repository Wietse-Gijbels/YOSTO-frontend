import { Component } from '@angular/core';
import { StudyHelperRegistreerComponent } from '../gebruiker/study-helper-registreer/study-helper-registreer.component';
import { StudyLookerRegistreerComponent } from '../gebruiker/study-looker-registreer/study-looker-registreer.component';
import { NgIf } from '@angular/common';
import { GebruikerHeaderComponent } from '../gebruiker/gebruiker-header/gebruiker-header.component';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
} from '@angular/material/button-toggle';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-registreer',
  standalone: true,
  imports: [
    StudyHelperRegistreerComponent,
    StudyLookerRegistreerComponent,
    NgIf,
    GebruikerHeaderComponent,
    MatButtonToggleGroup,
    MatButtonToggle,
  ],
  templateUrl: './registreer.component.html',
  styleUrl: './registreer.component.scss',
})
export class RegistreerComponent {
  currentComponent: 'helper' | 'looker' = 'helper';
  containerHeight: string = 'auto'; // Initial height

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const form = params['form'];
      this.currentComponent = form === 'helper' ? 'helper' : 'looker';
    });
    this.updateContainerHeight();
  }

  toggleComponent(component: 'helper' | 'looker'): void {
    this.currentComponent = component;
    this.router.navigate(['/registreer']); // Zodat de url terug clean is
    this.updateContainerHeight();
  }

  private updateContainerHeight(): void {
    // Adjust height based on active tab
    this.containerHeight =
      this.currentComponent === 'looker' ? '100vh' : 'auto';
  }
}
