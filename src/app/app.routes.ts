import { Routes } from '@angular/router';
import {LoginComponent} from "./gebruiker/login/login.component";
import {RegistreerComponent} from "./gebruiker/registreer/registreer.component";
import {GebruikersOverzichtComponent} from "./gebruiker/gebruikers-overzicht/gebruikers-overzicht.component";
import {authGuard} from "./guards/AuthGuard";

export const routes: Routes = [{
  path: '',
  children:[
    {path: 'login',component: LoginComponent},
    {path: 'registreer',component: RegistreerComponent},
    {
      path: 'gebruikers-overzicht',
      component: GebruikersOverzichtComponent,
      canActivate: [authGuard],
    },
  ]
}];
