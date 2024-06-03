import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { GebruikerService } from '../service/gebruiker.service';
import { GebruikerRol } from '../models/interfaces';

@Directive({
  selector: '[rolChecker]',
  standalone: true,
})
export class rolChecker {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private gebruikerService: GebruikerService,
  ) {}

  @Input({ required: true }) set rolChecker(requiredRol: GebruikerRol[]) {
    this.gebruikerService.getRol().subscribe((rol) => {
      if ( requiredRol.includes(rol) ) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
