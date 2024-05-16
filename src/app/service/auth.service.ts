import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: any) {} // Dit is om te checken of er een localstorage aanwezig is

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {  // Dit is om te checken of er een localstorage aanwezig is
      return !!localStorage.getItem('token');
      // TO DO Call naar de backend om te checken of dat de token die aanwezig is in de localstorage wel valid is
    }
    return false;
  }
}
