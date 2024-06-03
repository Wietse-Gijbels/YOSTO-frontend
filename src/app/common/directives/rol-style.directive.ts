import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { GebruikerRol } from '../models/interfaces';
import { GebruikerService } from '../service/gebruiker.service';

@Directive({
  selector: '[rolStyle]',
  standalone: true,
})
export class rolStyle implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private gebruikerService: GebruikerService,
  ) {}

  ngOnInit() {
    this.gebruikerService.getRol().subscribe((rol) => {
      if (rol === GebruikerRol.STUDYHELPER) {
        this.renderer.addClass(
          this.elementRef.nativeElement,
          'helper-container',
        );
      } else {
        this.renderer.addClass(
          this.elementRef.nativeElement,
          'looker-container',
        );
      }
    });
  }
}
