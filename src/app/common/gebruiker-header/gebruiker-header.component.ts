import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { GebruikerService } from '../service/gebruiker.service';
import { GebruikerRol } from '../models/interfaces';

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
  fotoPath: string = '';

  constructor(private gebruikerService: GebruikerService) {}

  ngOnInit() {
    this.gebruikerService.getRol().subscribe((rol) => {
      if (rol === GebruikerRol.STUDYHELPER) {
        this.fotoPath = '../../../assets/images/helper-yosto-logo.png';
      } else {
        this.fotoPath = '../../../assets/images/looker-yosto-logo.png';
      }
    });
  }
}
