import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { GebruikerRol } from '../models/interfaces';
import { AuthService } from '../service/auth.service';
import { GebruikerService } from '../service/gebruiker.service';
import { CookieService } from 'ngx-cookie-service';

@Directive({
  selector: '[rolStyle]',
  standalone: true,
})
export class rolStyle implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService,
    private gebruikerService: GebruikerService,
    private cookieService: CookieService,
  ) {}

  ngOnInit() {
    if (this.cookieService.get('rol')) {
      if (this.cookieService.get('rol') === 'STUDYHELPER') {
        this.renderer.addClass(
          this.elementRef.nativeElement,
          'helper-container',
        );
      } else if (this.cookieService.get('rol') === 'STUDYLOOKER') {
        this.renderer.addClass(
          this.elementRef.nativeElement,
          'looker-container',
        );
      }
    } else if (this.authService.getRol()) {
      if (this.authService.getRol() === GebruikerRol.STUDYHELPER) {
        this.renderer.addClass(
          this.elementRef.nativeElement,
          'helper-container',
        );
      } else if (this.authService.getRol() === GebruikerRol.STUDYLOOKER) {
        this.renderer.addClass(
          this.elementRef.nativeElement,
          'looker-container',
        );
      }
    }
  }
}
