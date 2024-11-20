import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, RouterStateSnapshot } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AuthState } from "../reducers";
import { isLoggedInSelector } from "../authstore/login.selector";
import { tap } from "rxjs/operators";

export const loginGuard:CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    let Authstore =inject(Store<AuthState>)
    
    return Authstore.pipe(select(isLoggedInSelector))
}
