import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers";

export const selectAuthState= createFeatureSelector<AuthState>('login')

export const isLoggedInSelector = createSelector(selectAuthState,login => login.user?.isLoggedIn ?? false)