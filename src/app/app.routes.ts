import { Routes } from '@angular/router';
import { LoginComponent } from './gebruiker/login/login.component';
import { RegistreerComponent } from './gebruiker/registreer/registreer.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registreer', component: RegistreerComponent },
      { path: 'chat', component: ChatComponent },
    ],
  },
];
