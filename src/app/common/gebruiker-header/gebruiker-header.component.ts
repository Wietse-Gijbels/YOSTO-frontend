import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'gebruiker-header',
  standalone: true,
  imports: [NgClass],
  templateUrl: './gebruiker-header.component.html',
  styleUrls: ['./gebruiker-header.component.scss'],
})
export class GebruikerHeaderComponent {
  @Input() headerText: string = '';
  @Input({ required: true }) backgroundColor!: string;
  @Input() subText: string = '';
}
