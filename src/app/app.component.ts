import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BackendConnectionComponent } from '../backend-connection/backend-connection.component';
import { HttpClientModule } from '@angular/common/http';
import { RegistreerComponent } from './gebruiker/registreer/registreer.component';
import { AuthService } from './service/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    BackendConnectionComponent,
    HttpClientModule,
    RouterLink,
    RegistreerComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  curr: any;
  token: string | null = '';
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
    }
  }

  Logout(): void {
    localStorage.removeItem('token');
  }
}
