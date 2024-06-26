import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { GebruikerRol } from '../models/interfaces';
import { AuthService } from '../service/auth.service';
import { GebruikerService } from '../service/gebruiker.service';
import { CookieService } from 'ngx-cookie-service';

@Directive({
  selector: '[rolChecker]',
  standalone: true,
})
export class rolChecker {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
    private gebruikerService: GebruikerService,
    private cookieService: CookieService,
  ) {}

  @Input({ required: true }) set rolChecker(requiredRol: GebruikerRol[]) {
    const rol = this.authService.getRol();
    if (this.cookieService.get('rol')) {
      if (requiredRol.toString().includes(this.cookieService.get('rol'))) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else if (this.authService.getRol() && rol !== undefined) {
      if (requiredRol.includes(rol)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    } else {
      this.gebruikerService.getActiveRol().subscribe((rol) => {
        if (requiredRol.includes(rol)) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else if (rol === GebruikerRol.STUDYLOOKER) {
          this.viewContainer.clear();
        }
      });
    }
  }
}
