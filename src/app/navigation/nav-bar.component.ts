import { Component } from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faClipboardQuestion, faGraduationCap, faHouse} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-solid-svg-icons/faHeart";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {faComment} from "@fortawesome/free-regular-svg-icons";
import {NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FaIconComponent, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  protected readonly faGraduationCap = faGraduationCap;
  protected readonly faHeart = faHeart;
  protected readonly faClipboardQuestion = faClipboardQuestion;
  protected readonly faComment = faComment;
  protected readonly faHouse = faHouse;
}
