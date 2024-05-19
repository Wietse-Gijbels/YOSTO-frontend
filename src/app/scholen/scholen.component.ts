import { Component } from '@angular/core';
import { NavBarComponent } from '../navigation/nav-bar.component';

@Component({
  selector: 'app-scholen',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './scholen.component.html',
  styleUrl: './scholen.component.scss',
})
export class ScholenComponent {}
