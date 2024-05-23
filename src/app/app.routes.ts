import { Routes } from '@angular/router';
import { LoginComponent } from './gebruiker/login/login.component';
import { GebruikersOverzichtComponent } from './gebruiker/gebruikers-overzicht/gebruikers-overzicht.component';
import { authGuard } from './guards/AuthGuard';
import { StudyHelperRegistreerComponent } from './gebruiker/study-helper-registreer/study-helper-registreer.component';
import { StudyLookerRegistreerComponent } from './gebruiker/study-looker-registreer/study-looker-registreer.component';
import { StartSchermComponent } from './start-scherm/start-scherm.component';
import { HomeComponent } from './home/home.component';
import { FavorietenComponent } from './favorieten/favorieten.component';
import { VeelGesteldeVragenComponent } from './veel-gestelde-vragen/veel-gestelde-vragen.component';
import { RegistreerComponent } from './registreer/registreer.component';
import { ChatComponent } from './chat/chat.component';
import { StudierichtingenComponent } from './studierichtingen/studierichtingen.component';
import { GeschenkCategorieOverviewComponent } from './geschenken/geschenk-categorie-overview/geschenk-categorie-overview.component';

export const routes: Routes = [
  { path: '', component: StartSchermComponent }, // Default route to StartSchermComponent
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registreer',
    component: RegistreerComponent,
  },
  {
    path: 'study-helper-registreer',
    component: StudyHelperRegistreerComponent,
  },
  {
    path: 'study-looker-registreer',
    component: StudyLookerRegistreerComponent,
  },
  {
    path: 'gebruikers-overzicht',
    component: GebruikersOverzichtComponent,
    canActivate: [authGuard],
  },
  { path: 'home', component: HomeComponent },
  { path: 'favorieten', component: FavorietenComponent },
  { path: 'studierichting', component: StudierichtingenComponent },
  { path: 'veelGesteldeVragen', component: VeelGesteldeVragenComponent },
  { path: 'chat', component: ChatComponent },
  { path: 'geschenken', component: GeschenkCategorieOverviewComponent },
];
