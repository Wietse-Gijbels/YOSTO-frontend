import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { GebruikerService } from '../service/gebruiker.service';
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
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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
  protected readonly GebruikerRol = GebruikerRol;
  @Input() headerText: string = '';
  @Input({ required: true }) backgroundColor!: string;
  @Input() subText: string = '';
  @Input() fotoPath: string = '';
  src: string = '';
  @Input() class: string = '';
  rollen: GebruikerRol[] = [];
  activeRol: GebruikerRol | undefined;

  constructor(private gebruikerService: GebruikerService) {}

  ngOnInit() {
    this.gebruikerService.getRollen().subscribe((rollen) => {
      this.rollen = rollen;
    });
    if (this.fotoPath) {
      this.src = this.fotoPath;
    } else {
      this.gebruikerService.getRol().subscribe((rol) => {
        this.activeRol = rol;
        if (rol === GebruikerRol.STUDYHELPER) {
          this.src = '../../../assets/images/helper-yosto-logo.png';
        } else {
          this.src = '../../../assets/images/looker-yosto-logo.png';
        }
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['fotoPath']) {
      this.src = changes['fotoPath'].currentValue;
    }
  }

  changeRol(rol: GebruikerRol) {
    this.gebruikerService.changeActiveRol(rol);
    this.activeRol = rol;
  }
}
