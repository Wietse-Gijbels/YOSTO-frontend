import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../common/service/auth.service';
import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.formData).pipe(
          map((response) =>
            AuthActions.loginSuccess({ token: response.token }),
          ),
          catchError((error) => {
            const errorMessage = error.error || {
              errorLogin: 'Inloggen mislukt. Probeer opnieuw.',
            };
            return of(AuthActions.loginFailure({ error: errorMessage }));
          }),
        ),
      ),
    ),
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          this.cookieService.set('token', action.token);
          this.router.navigate(['/home']);
        }),
      ),
    { dispatch: false },
  );

  registerLooker$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerLooker),
      mergeMap((action) =>
        this.authService.registreerLooker(action.formData).pipe(
          map((response) =>
            AuthActions.registerLookerSuccess({ token: response.token }),
          ),
          catchError((error) => {
            const errorMessage = error.error || {
              errorRegister: 'Registratie mislukt. Probeer opnieuw.',
            };
            return of(
              AuthActions.registerLookerFailure({ error: errorMessage }),
            );
          }),
        ),
      ),
    ),
  );

  registerHelper$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerHelper),
      mergeMap((action) =>
        this.authService.registreerHelper(action.formData).pipe(
          map((response) =>
            AuthActions.registerHelperSuccess({ token: response.token }),
          ),
          catchError((error) => {
            const errorMessage = error.error || {
              errorRegister: 'Registratie mislukt. Probeer opnieuw.',
            };
            return of(
              AuthActions.registerHelperFailure({ error: errorMessage }),
            );
          }),
        ),
      ),
    ),
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => {
        this.cookieService.delete('token');
        this.router.navigateByUrl('/login');
        return { type: '[Auth] Logout Success' };
      }),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService,
  ) {}
}
