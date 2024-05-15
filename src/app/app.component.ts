import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BackendConnectionComponent} from "../backend-connection/backend-connection.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BackendConnectionComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-yosto';
}
