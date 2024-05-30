import { Component, Input } from '@angular/core';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { NgIf, NgStyle } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgStyle, FaIconComponent, RouterLink, NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input({ required: true }) title!: String;
  @Input({ required: true }) subtextLine1!: String;
  @Input() subtextLine2!: String;
  @Input() id?: String;
  @Input() icon?: IconProp;
  @Input() afterText?: String;
  @Input() mapsUrl?: String;

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

  protected readonly faLocationDot = faLocationDot;
  protected readonly encodeURIComponent = encodeURIComponent;
}
