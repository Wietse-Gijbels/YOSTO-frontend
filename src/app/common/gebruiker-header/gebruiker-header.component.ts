import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { NgClass } from '@angular/common';
import { GebruikerService } from '../service/gebruiker.service';
import { GebruikerRol } from '../models/interfaces';
import {rolStyle} from "../directives/rol-style.directive";

@Component({
  selector: 'gebruiker-header',
  standalone: true,
  imports: [NgClass, rolStyle],
  templateUrl: './gebruiker-header.component.html',
  styleUrls: ['./gebruiker-header.component.scss'],
})
export class GebruikerHeaderComponent implements OnInit{
  @Input() headerText: string = '';
  @Input({ required: true }) backgroundColor!: string;
  @Input() subText: string = '';
  @Input() fotoPath: string = '';
  src: string = '';
  @Input() class: string = '';

  constructor(private gebruikerService: GebruikerService) {}

  ngOnInit() {
    if (this.fotoPath) {
      this.src = this.fotoPath;
    }
    else{
      this.gebruikerService.getRol().subscribe((rol) => {
        if (rol === GebruikerRol.STUDYHELPER) {
          this.src = '../../../assets/images/helper-yosto-logo.png';
        } else {
          this.src = '../../../assets/images/looker-yosto-logo.png';
        }
      })
    }
  }
}
