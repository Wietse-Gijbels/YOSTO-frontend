import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CardComponent } from '../studierichtingen/card/card.component';
import { FormsModule } from '@angular/forms';
import { GebruikerHeaderComponent } from '../common/gebruiker-header/gebruiker-header.component';
import { MatPaginator } from '@angular/material/paginator';
import { NavBarComponent } from '../common/navigation/nav-bar.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faBriefcase,
  faBuildingColumns,
  faGraduationCap,
  faHouse,
  faPlaneDeparture,
  faSchool,
  faScrewdriverWrench,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { rolStyle } from '../common/directives/rol-style.directive';

@Component({
  selector: 'app-linktree',
  standalone: true,
  imports: [
    AsyncPipe,
    CardComponent,
    FormsModule,
    GebruikerHeaderComponent,
    MatPaginator,
    NavBarComponent,
    FaIconComponent,
    RouterLink,
    rolStyle,
  ],
  templateUrl: './linktree.component.html',
  styleUrl: './linktree.component.scss',
})
export class LinktreeComponent {
  protected readonly faUser = faUser;
  protected readonly faBriefcase = faBriefcase;
  protected readonly faHouse = faHouse;
  protected readonly faScrewdriverWrench = faScrewdriverWrench;
  protected readonly faPlaneDeparture = faPlaneDeparture;
  protected readonly faSchool = faSchool;
  protected readonly faBuildingColumns = faBuildingColumns;
  protected readonly faGraduationCap = faGraduationCap;
}
