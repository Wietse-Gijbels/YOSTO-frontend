import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { CardComponent } from '../card/card.component';
import { GebruikerHeaderComponent } from '../../common/gebruiker-header/gebruiker-header.component';
import { NavBarComponent } from '../../common/navigation/nav-bar.component';
import { StudierichtingInterface } from '../../common/models/interfaces';
import { StudierichtingService } from '../../common/service/studierichting.service';

@Component({
  selector: 'app-studierichting-details',
  standalone: true,
  imports: [
    GebruikerHeaderComponent,
    NavBarComponent,
    AsyncPipe,
    FaIconComponent,
    CardComponent,
  ],
  templateUrl: './studierichting-details.component.html',
  styleUrls: ['./studierichting-details.component.scss'],
})
export class StudierichtingDetailsComponent implements OnInit {
  studierichtingId: string | null = null;
  public studierichting$?: Observable<StudierichtingInterface>;
  protected readonly encodeURIComponent = encodeURIComponent;
  protected readonly faLocationDot = faLocationDot;

  constructor(
    private route: ActivatedRoute,
    private studierichtingService: StudierichtingService,
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.studierichtingId = params.get('id');
      if (this.studierichtingId) {
        this.studierichting$ = this.studierichtingService.findStudierichting(
          this.studierichtingId,
        );
      }
    });
  }
}
