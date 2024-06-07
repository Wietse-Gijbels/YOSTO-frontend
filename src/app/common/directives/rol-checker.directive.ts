import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { GebruikerRol } from '../models/interfaces';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[rolChecker]',
  standalone: true,
})
export class rolChecker {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService,
  ) {}

  @Input({ required: true }) set rolChecker(requiredRol: GebruikerRol[]) {
    const rol = this.authService.getRol();
    if (rol !== undefined && requiredRol.includes(rol)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
