import { Routes } from '@angular/router';
import {LoginComponent} from "./gebruiker/login/login.component";
import {GebruikersOverzichtComponent} from "./gebruiker/gebruikers-overzicht/gebruikers-overzicht.component";
import {authGuard} from "./guards/AuthGuard";
import {StudyHelperRegistreerComponent} from "./gebruiker/study-helper-registreer/study-helper-registreer.component";
import {StudyLookerRegistreerComponent} from "./gebruiker/study-looker-registreer/study-looker-registreer.component";
import {StartSchermComponent} from "./start-scherm/start-scherm.component";

export const routes: Routes = [
  { path: '', component: StartSchermComponent }, // Default route to StartSchermComponent
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'study-helper-registreer',
    component: StudyHelperRegistreerComponent
  },
  {
    path: 'study-looker-registreer',
    component: StudyLookerRegistreerComponent
  },
  {
    path: 'gebruikers-overzicht',
    component: GebruikersOverzichtComponent,
    canActivate: [authGuard]
  }
];
