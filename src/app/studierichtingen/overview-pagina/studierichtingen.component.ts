import { Component, OnInit } from '@angular/core';
import { StudierichtingService } from '../../common/service/studierichting.service';
import { StudierichtingInterface } from '../../common/models/interfaces';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { AsyncPipe, NgStyle } from '@angular/common';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { CardComponent } from '../card/card.component';

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
  ],
})
export class StudierichtingenComponent implements OnInit {
  public studierichtingen$!: Observable<{
    totalElements: number;
    content: StudierichtingInterface[];
  }>;
  public pageSize = 10;
  public page = 0;

  constructor(private studierichtingService: StudierichtingService) {}

  ngOnInit() {
    this.loadPage(this.page);
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.loadPage(event.pageIndex);
  }

  private loadPage(page: number) {
    this.studierichtingen$ = this.studierichtingService.findAll(page);
  }

  protected readonly faLocationDot = faLocationDot;
  protected readonly encodeURIComponent = encodeURIComponent;
}
