import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { rolStyle } from '../directives/rol-style.directive';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import {
  animate,
  keyframes,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    RouterLinkActive,
    NgOptimizedImage,
    MatButton,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatMenu,
    MatMenuTrigger,
    rolStyle,
    NgClass,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        query(
          '.pop-up-item',
          [
            style({ opacity: 0, transform: 'scale(0.5)' }),
            stagger(75, [
              animate(
                '200ms ease-in',
                keyframes([
                  style({ opacity: 0, transform: 'scale(0.5)', offset: 0 }),
                  style({ opacity: 1, transform: 'scale(1.1)', offset: 0.7 }),
                  style({ opacity: 1, transform: 'scale(1)', offset: 1.0 }),
                ]),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
      transition(':leave', [
        query(
          '.pop-up-item',
          [
            stagger(-75, [
              animate(
                '200ms ease-out',
                keyframes([
                  style({ opacity: 1, transform: 'scale(1)', offset: 0 }),
                  style({ opacity: 0, transform: 'scale(0.5)', offset: 1.0 }),
                ]),
              ),
            ]),
          ],
          { optional: true },
        ),
      ]),
    ]),
  ],
})
export class NavBarComponent {
  public popUpVisible = false;
  protected readonly faAddressCard = faAddressCard;
  protected readonly faBagShopping = faBagShopping;

  constructor() {}

  togglePopUp() {
    this.popUpVisible = !this.popUpVisible;
  }
}
