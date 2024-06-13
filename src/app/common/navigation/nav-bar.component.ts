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
import {GebruikerRol} from "../models/interfaces";
import {rolChecker} from "../directives/rol-checker.directive";

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
    rolChecker,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  protected readonly faAddressCard = faAddressCard;
  protected readonly faBagShopping = faBagShopping;

  constructor() {}

  protected readonly GebruikerRol = GebruikerRol;
}
