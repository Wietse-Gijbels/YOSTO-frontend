import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { GebruikerRol } from '../models/interfaces';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[rolStyle]',
  standalone: true,
})
export class rolStyle implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    if (this.authService.getRol() === GebruikerRol.STUDYHELPER) {
      this.renderer.addClass(this.elementRef.nativeElement, 'helper-container');
    } else {
      this.renderer.addClass(this.elementRef.nativeElement, 'looker-container');
    }
  }
}
