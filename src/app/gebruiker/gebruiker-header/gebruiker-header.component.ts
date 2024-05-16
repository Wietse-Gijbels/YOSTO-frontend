import {Component, Input} from '@angular/core';

@Component({
  selector: 'gebruiker-header',
  standalone: true,
  imports: [],
  templateUrl: './gebruiker-header.component.html',
  styleUrl: './gebruiker-header.component.scss'
})
export class GebruikerHeaderComponent {
  @Input() headerText: string = "";
}
