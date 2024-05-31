import { Component, OnInit } from '@angular/core';
import { StudierichtingService } from '../../common/service/studierichting.service';
import { StudierichtingInterface } from '../../common/models/interfaces';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { AsyncPipe, NgClass, NgIf, NgStyle } from '@angular/common';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { CardComponent } from '../card/card.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-studierichtingen',
  templateUrl: './studierichtingen.component.html',
  styleUrls: ['./studierichtingen.component.scss'],
  standalone: true,
  imports: [
    GebruikerHeaderComponent,
    AsyncPipe,
    NgStyle,
    MatPaginator,
    NavBarComponent,
    CardComponent,
    NgIf,
    FormsModule,
    NgClass,
  ],
})
export class StudierichtingenComponent implements OnInit {
  public studierichtingen$!: Observable<{
    totalElements: number;
    content: StudierichtingInterface[];
  }>;
  public pageSize: number = 10;
  public page: number = 0;
  public filterNaam: string = '';
  public filterNiveau: string = '';
  public showFilter: boolean = false;
  public order: string = 'asc';
  public loading: boolean = true;
  protected readonly faLocationDot = faLocationDot;
  protected readonly encodeURIComponent = encodeURIComponent;

  constructor(private studierichtingService: StudierichtingService) {}

  ngOnInit() {
    this.loadPage(this.page);
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  applyFilter() {
    this.page = 0;
    this.toggleFilter();
    this.loadPage(this.page);
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.loadPage(event.pageIndex);
  }

  private loadPage(page: number) {
    this.loading = true; // Show loading spinner
    setTimeout(() => {
      this.studierichtingen$ =
        this.studierichtingService.getOverviewFilteredHogerOnderwijsRichtingen(
          page,
          this.filterNaam,
          this.filterNiveau,
          this.order,
        );
      this.studierichtingen$.subscribe(
        () => {
          this.loading = false;
        },
        () => {
          this.loading = false;
        },
      );
    }, 200); // Delay for 0.2 seconds
  }
}
