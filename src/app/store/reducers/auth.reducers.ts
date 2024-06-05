import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  token: string | null;
  lookerError: { [key: string]: string } | null;
  helperError: { [key: string]: string } | null;
  authError: { [key: string]: string } | null;
}

export const initialState: AuthState = {
  token: null,
  lookerError: null,
  helperError: null,
  authError: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, { token }) => ({
    ...state,
    token,
    authError: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    authError: error,
  })),
  on(AuthActions.registerLookerFailure, (state, { error }) => ({
    ...state,
    lookerError: error,
  })),
  on(AuthActions.registerHelperFailure, (state, { error }) => ({
    ...state,
    helperError: error,
  })),
  on(
    AuthActions.registerLookerSuccess,
    AuthActions.registerHelperSuccess,
    (state, { token }) => ({
      ...state,
      token,
      lookerError: null,
      helperError: null,
    }),
  ),
);
