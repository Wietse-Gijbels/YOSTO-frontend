import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ formData: any }>());

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string }>(),
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: { [key: string]: string } }>(),
);

export const registerLooker = createAction(
  '[Auth] Register Looker',
  props<{ formData: any; role: string }>(),
);

export const registerLookerSuccess = createAction(
  '[Auth] Register Looker Success',
  props<{ token: string }>(),
);

export const registerLookerFailure = createAction(
  '[Auth] Register Looker Failure',
  props<{ error: { [key: string]: string } }>(),
);

export const registerHelper = createAction(
  '[Auth] Register Helper',
  props<{ formData: any; role: string }>(),
);

export const registerHelperSuccess = createAction(
  '[Auth] Register Helper Success',
  props<{ token: string }>(),
);

export const registerHelperFailure = createAction(
  '[Auth] Register Helper Failure',
  props<{ error: { [key: string]: string } }>(),
);

export const logout = createAction('[Auth] Logout');
export const clearToken = createAction('[Auth] Clear Token'); // Nieuwe actie om de token te verwijderen
