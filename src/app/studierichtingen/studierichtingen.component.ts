import { Component, OnInit } from '@angular/core';
import { StudierichtingService } from '../service/studierichting.service';
import { StudierichtingInterface } from '../models/interfaces';
import { Observable } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GebruikerHeaderComponent } from '../gebruiker/gebruiker-header/gebruiker-header.component';
import { AsyncPipe, NgStyle } from '@angular/common';
import { NavBarComponent } from '../navigation/nav-bar.component';

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
  ],
})
export class StudierichtingenComponent implements OnInit {
  public studierichtingen$!: Observable<{
    totalElements: number;
    content: StudierichtingInterface[];
  }>;
  public pageSize = 20;
  public page = 0;
  private colors: string[] = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#FF33A1',
    '#FF8C33',
    '#33FFC1',
    '#8C33FF',
    '#FF5733',
    '#33FFD5',
    '#FFD533',
    '#FF3333',
    '#33FF57',
    '#33FF8C',
    '#8CFF33',
    '#5733FF',
    '#FF338C',
    '#5733FF',
    '#33FFBD',
    '#FFC433',
    '#FF5733',
    '#33FF57',
    '#5733FF',
    '#FF5733',
    '#33FFD5',
    '#FFD533',
    '#8C33FF',
    '#33FF57',
    '#FF5733',
    '#FFD533',
    '#33FFBD',
  ];

  constructor(private studierichtingService: StudierichtingService) {}

  ngOnInit() {
    this.loadPage(this.page, this.pageSize);
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.loadPage(event.pageIndex, this.pageSize);
  }

  private loadPage(page: number, pageSize: number) {
    this.studierichtingen$ = this.studierichtingService.findAll(page, pageSize);
  }

  getRandomGradient(seed: string): { [klass: string]: any } {
    const shuffledColors = this.shuffleArray(this.colors, seed);
    const [color1, color2, color3] = shuffledColors.slice(0, 3);

    return {
      background: `radial-gradient(circle at center,
                 ${color1} 0%,
                 ${color1} 20%,
                 ${color2} 50%,
                 ${color3} 80%,
                 ${color3} 100%)`,
    };
  }

  private shuffleArray(array: any[], seed: string): any[] {
    const seedLength = seed.length;
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;
    let temporaryValue;
    let randomIndex;

    for (let i = currentIndex - 1; i > 0; i--) {
      randomIndex = Math.floor(
        (seed.charCodeAt(i % seedLength) / 255) * (i + 1),
      );
      temporaryValue = shuffledArray[i];
      shuffledArray[i] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }

    return shuffledArray;
  }
}
