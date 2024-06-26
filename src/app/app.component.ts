import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './common/navigation/nav-bar.component';
import { StartSchermComponent } from './registreer-login/start-scherm/start-scherm.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [CookieService],
  imports: [
    RouterOutlet,
    HttpClientModule,
    NavBarComponent,
    RouterLink,
    StartSchermComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}

  ngOnInit(): void {}
}
