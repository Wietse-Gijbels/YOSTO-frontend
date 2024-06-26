import { Routes } from '@angular/router';
import { LoginComponent } from './registreer-login/login/login.component';
import { StartSchermComponent } from './registreer-login/start-scherm/start-scherm.component';
import { HomeComponent } from './home/home-pagina/home.component';
import { FavorietenComponent } from './studierichtingen/favorieten/favorieten.component';
import { VeelGesteldeVragenComponent } from './veel-gestelde-vragen/veel-gestelde-vragen.component';
import { StudierichtingDetailsComponent } from './studierichtingen/studierichting-details/studierichting-details.component';
import { RegistreerComponent } from './registreer-login/registreer-pagina/registreer.component';
import { PersoonlijkeInfoComponent } from './persoonlijke-info/persoonlijke-info.component';
import { GeschenkCategorieOverviewComponent } from './geschenken/geschenk-categorie-overview/geschenk-categorie-overview.component';
import { AddGeschenkCategorieComponent } from './geschenken/add-geschenk-categorie/add-geschenk-categorie.component';
import { GeschenkInfoComponent } from './geschenken/geschenk-info/geschenk-info.component';
import { AddGeschenkComponent } from './geschenken/add-geschenk/add-geschenk.component';
import { StudierichtingenComponent } from './studierichtingen/overview-pagina/studierichtingen.component';
import { GebruikersLijstComponent } from './Chats/gebruikers-lijst/gebruikers-lijst.component';
import { ChatComponent } from './Chats/chat/chat.component';
import { MatchingTestComponent } from './matching-test/matching-test.component';
import { VerifyComponent } from './registreer-login/verify/verify.component';
import { LinktreeComponent } from './linktree/linktree.component';
import { DiplomasComponent } from './diplomas/diplomas/diplomas.component';

export const routes: Routes = [
  { path: '', component: StartSchermComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registreer',
    component: RegistreerComponent,
  },
  { path: 'home', component: HomeComponent },
  { path: 'favorieten', component: FavorietenComponent },
  { path: 'studierichting', component: StudierichtingenComponent },
  { path: 'studierichting/:id', component: StudierichtingDetailsComponent },
  { path: 'veelGesteldeVragen', component: VeelGesteldeVragenComponent },
  { path: 'chat', component: GebruikersLijstComponent },
  { path: 'chat/:id', component: ChatComponent },
  {
    path: 'geschenken-overview',
    component: GeschenkCategorieOverviewComponent,
  },
  { path: 'add-geschenk-categorie', component: AddGeschenkCategorieComponent },
  { path: 'add-geschenk', component: AddGeschenkComponent },
  { path: 'geschenk-info/:id', component: GeschenkInfoComponent },
  { path: 'persoonlijkeInfo', component: PersoonlijkeInfoComponent },
  { path: 'test', component: MatchingTestComponent },
  { path: 'verify', component: VerifyComponent },
  { path: 'linktree', component: LinktreeComponent },
  { path: 'diplomas', component: DiplomasComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
