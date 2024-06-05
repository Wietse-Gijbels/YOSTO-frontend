import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { CookieService } from 'ngx-cookie-service';
import { provideStore } from '@ngrx/store';
import { authReducer } from './app/store/reducers/auth.reducers';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './app/store/effects/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    CookieService,
    provideStore({
      auth: authReducer,
    }),
    provideEffects([AuthEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
}).catch((err) => console.error(err));
