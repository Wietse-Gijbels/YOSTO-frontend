import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { NgIf, NgStyle } from '@angular/common';
import {rolStyle} from "../../common/directives/rol-style.directive";

@Component({
  selector: 'app-socials',
  standalone: true,
  imports: [FontAwesomeModule, NgIf, NgStyle, rolStyle],
  templateUrl: './socials.component.html',
  styleUrls: ['./socials.component.scss'],
})
export class SocialsComponent {
  @Input() facebookLink: string | null = null;
  @Input() twitterLink: string | null = null;
  @Input() instagramLink: string | null = null;
  @Input() linkedinLink: string | null = null;
  @Input() iconColor: string = 'rood';
  @Input() grootte: string = 'medium';
  @Input() uitlijning: string = 'links';

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faLinkedin = faLinkedin;
}
