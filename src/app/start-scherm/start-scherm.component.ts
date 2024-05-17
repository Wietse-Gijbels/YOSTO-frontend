import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'start-scherm',
  standalone: true,
  imports: [],
  templateUrl: './start-scherm.component.html',
  styleUrl: './start-scherm.component.scss'
})
export class StartSchermComponent {

  constructor(private router: Router) {
  }


  navigeerNaarRegistreerHelper() {
    this.router.navigateByUrl('/registreer?form=helper');
  }

  navigeerNaarRegistreerLooker() {
    this.router.navigateByUrl('/registreer?form=looker');
  }

  navigeerNaarLogin() {
    this.router.navigateByUrl('/login');
  }
}
