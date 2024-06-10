import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'start-scherm',
  standalone: true,
  imports: [],
  templateUrl: './start-scherm.component.html',
  styleUrl: './start-scherm.component.scss',
})
export class StartSchermComponent implements OnInit {
  constructor(
    private router: Router,
    private cookieService: CookieService,
  ) {}

  ngOnInit(): void {
    this.cookieService.delete('token');
    this.cookieService.delete('rol');
  }

  navigeerNaarRegistreerHelper(): void {
    this.router.navigateByUrl('/registreer?form=helper');
  }

  navigeerNaarRegistreerLooker(): void {
    this.router.navigateByUrl('/registreer?form=looker');
  }

  navigeerNaarLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
