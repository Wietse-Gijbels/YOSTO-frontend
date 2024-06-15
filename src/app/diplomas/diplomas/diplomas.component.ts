import { Component, OnInit } from '@angular/core';
import { rolStyle } from '../../common/directives/rol-style.directive';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { MatTable } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { StudierichtingInterface } from '../../common/models/interfaces';
import { GebruikerService } from '../../common/service/gebruiker.service';
import { AsyncPipe } from '@angular/common';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { StudierichtingService } from '../../common/service/studierichting.service';

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
    ReactiveFormsModule,
  ],
  templateUrl: './diplomas.component.html',
  styleUrl: './diplomas.component.scss',
})
export class DiplomasComponent implements OnInit {
  diplomas$: Observable<StudierichtingInterface[]> | undefined;
  filteredRichtingen: string[] = [];
  form = this.formBuilder.nonNullable.group({ nieuwDiploma: [''] });

  protected readonly faPlus = faPlus;

  constructor(
    private gebruikerService: GebruikerService,
    private formBuilder: FormBuilder,
    private studierichtingService: StudierichtingService,
  ) {}

  ngOnInit() {
    this.diplomas$ = this.gebruikerService.diplomas();
    this.form
      .get('nieuwDiploma')!
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((value) => {
          if (value) {
            return this.studierichtingService.getFilteredHogerOnderwijsRichtingenToevoeging(
              value,
            );
          } else {
            return of([]);
          }
        }),
      )
      .subscribe((richtingen) => {
        this.filteredRichtingen = richtingen;
      });
  }

  addDiploma() {
    this.diplomas$ = this.gebruikerService.addDiploma(
      this.form.get('nieuwDiploma')!.value,
    );
    this.form.get('nieuwDiploma')!.setValue('');
    this.gebruikerService.diplomas();
  }

  onRichtingClick(richting: string) {
    this.form.get('nieuwDiploma')!.setValue(richting);
    this.filteredRichtingen = [];
  }
}
