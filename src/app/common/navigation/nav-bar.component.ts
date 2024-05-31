import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { MatButton } from '@angular/material/button';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { faAddressCard } from '@fortawesome/free-regular-svg-icons';
import { rolStyle } from '../directives/rol-style.directive';

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
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  open: boolean = false;
  protected readonly faAddressCard = faAddressCard;

  constructor() {}

  openSelection() {
    this.open = !this.open;
  }
}
