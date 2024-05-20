import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'start-scherm',
  standalone: true,
  imports: [],
  templateUrl: './start-scherm.component.html',
  styleUrl: './start-scherm.component.scss',
})
export class StartSchermComponent {
  constructor(private router: Router) {}

  navigeerNaarRegistreerHelper() {
    this.router.navigateByUrl('/study-helper-registreer');
  }

  navigeerNaarRegistreerLooker() {
    this.router.navigateByUrl('/study-looker-registreer');
  }

  navigeerNaarLogin() {
    this.router.navigateByUrl('/login');
  }
}
