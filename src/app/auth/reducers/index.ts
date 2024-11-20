import { isDevMode } from "@angular/core";
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
} from "@ngrx/store";
import { User } from "../model/user.model";
import { loginActions } from "../authstore/action-types";

export const loginFeatureKey = "login";

export interface AuthState {
  user: User;
}
export const initialState: AuthState = {
  user: undefined,
};

// export const reducers: ActionReducerMap<AuthState> = {};

export const authReducer = createReducer(
  initialState,
  on(loginActions.login, (state, {user}) => ({
    ...state,
    user: user
  })),
  on(loginActions.logout, (state) => ({
      ...state,
      user: undefined
  }))
);

// export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
