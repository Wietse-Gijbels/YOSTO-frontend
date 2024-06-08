import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { GebruikerRol } from '../models/interfaces';
import { rolStyle } from '../directives/rol-style.directive';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { MatFormField } from '@angular/material/form-field';
import { rolChecker } from '../directives/rol-checker.directive';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'gebruiker-header',
  standalone: true,
  imports: [
    NgClass,
    rolStyle,
    CdkDropList,
    MatFormField,
    rolChecker,
    MatButtonToggleGroup,
    MatExpansionPanelTitle,
    FaIconComponent,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    NgForOf,
    NgIf,
  ],
  templateUrl: './gebruiker-header.component.html',
  styleUrls: ['./gebruiker-header.component.scss'],
})
export class GebruikerHeaderComponent implements OnInit, OnChanges {
  @Input() headerText: string = '';
  @Input({ required: true }) backgroundColor!: string;
  @Input() subText: string = '';
  @Input() subMediumText: string = '';
  @Input() fotoPath: string = '';
  src: string = '';
  @Input() class: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    if (this.fotoPath) {
      this.src = this.fotoPath;
    } else {
      if (this.authService.getRol() === GebruikerRol.STUDYHELPER) {
        this.src = '../../../assets/images/helper-yosto-logo.png';
      } else {
        this.src = '../../../assets/images/looker-yosto-logo.png';
      }
    }
    if (this.class) {
      // remove class names from the div and add only the class name that is passed
      const classList = this.class.split(' ');
      const div = document.getElementById('div');
      if (div){
        div.classList.remove('helper-container');
        div.classList.remove('looker-container');
          div.classList.add(this.class);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fotoPath']) {
      this.src = changes['fotoPath'].currentValue;
    }
  }
}
