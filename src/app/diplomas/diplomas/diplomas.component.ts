import { Component, OnInit } from '@angular/core';
import { rolStyle } from '../../common/directives/rol-style.directive';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { StudierichtingInterface } from '../../common/models/interfaces';
import { GebruikerService } from '../../common/service/gebruiker.service';
import { AsyncPipe } from '@angular/common';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-diplomas',
  standalone: true,
  imports: [
    rolStyle,
    GebruikerHeaderComponent,
    MatTable,
    AsyncPipe,
    NavBarComponent,
    FaIconComponent,
  ],
  templateUrl: './diplomas.component.html',
  styleUrl: './diplomas.component.scss',
})
export class DiplomasComponent implements OnInit {
  diplomas$: Observable<StudierichtingInterface[]> | undefined;
  protected readonly faPlus = faPlus;

  constructor(private gebruikerService: GebruikerService) {}

  ngOnInit() {
    this.diplomas$ = this.gebruikerService.diplomas();
  }

  addDiploma() {}
}
