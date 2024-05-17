import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './navigation/nav-bar.component';
import { NgIf } from '@angular/common';
import { StartSchermComponent } from './start-scherm/start-scherm.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    NavBarComponent,
    RouterLink,
    NgIf,
    StartSchermComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}

  ngOnInit(): void {}
}
