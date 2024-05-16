import { Component } from '@angular/core';
import {NavBarComponent} from "../navigation/nav-bar.component";

@Component({
  selector: 'app-favorieten',
  standalone: true,
  imports: [
    NavBarComponent
  ],
  templateUrl: './favorieten.component.html',
  styleUrl: './favorieten.component.scss'
})
export class FavorietenComponent {

}
