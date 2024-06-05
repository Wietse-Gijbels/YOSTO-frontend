import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducers';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthToken = createSelector(
  selectAuthState,
  (state: AuthState) => state.token,
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.authError,
);

export const selectLookerError = createSelector(
  selectAuthState,
  (state: AuthState) => state.lookerError,
);

export const selectHelperError = createSelector(
  selectAuthState,
  (state: AuthState) => state.helperError,
);
