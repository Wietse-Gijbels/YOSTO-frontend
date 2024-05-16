import { Component } from '@angular/core';
import {NavBarComponent} from "../navigation/nav-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavBarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
