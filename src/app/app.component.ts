import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {BackendConnectionComponent} from "../backend-connection/backend-connection.component";
import {HttpClientModule} from "@angular/common/http";
import {NavBarComponent} from "./navigation/nav-bar.component";
import {AuthService} from "./service/auth.service";
import {NgIf} from "@angular/common";
import {StartSchermComponent} from "./start-scherm/start-scherm.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BackendConnectionComponent, HttpClientModule, NavBarComponent, RouterLink, NgIf, StartSchermComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  curr: any;

  constructor(
    private authService: AuthService,
  ) {
  }
  ngOnInit(): void {
  }
}
