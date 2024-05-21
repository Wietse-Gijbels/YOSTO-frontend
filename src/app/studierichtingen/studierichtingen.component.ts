import { Component, OnInit } from '@angular/core';
import { NavBarComponent } from '../navigation/nav-bar.component';
import { StudierichtingService } from '../service/studierichting.service';
import { Observable } from 'rxjs';
import { StudierichtingInterface } from '../models/interfaces';
import { AsyncPipe, NgStyle } from '@angular/common';

@Component({
  selector: 'app-studierichtingen',
  templateUrl: './studierichtingen.component.html',
  styleUrls: ['./studierichtingen.component.scss'],
  standalone: true,
  imports: [NavBarComponent, AsyncPipe, NgStyle],
})
export class StudierichtingenComponent implements OnInit {
  public studierrichtingen$?: Observable<StudierichtingInterface[]>;
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
    this.studierrichtingen$ = this.studierichtingService.findAll();
  }

  // Generate a random gradient background based on seed
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

  // Shuffle array based on seed
  private shuffleArray(array: any[], seed: string): any[] {
    console.log(seed);
    const seedLength = seed.length;
    const shuffledArray = [...array];
    let currentIndex = shuffledArray.length;
    let temporaryValue;
    let randomIndex;

    // Use seed characters to determine the shuffle
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
