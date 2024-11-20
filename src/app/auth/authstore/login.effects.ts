import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { loginActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";
@Injectable()
export class LoginEffects {
 
  constructor(private actions: Actions, private router: Router) {
// we can listen to actions and dispatch side effects
// on any action we want to trigger a api call we can listen to that event and trigger the api call with the help of effects
    // this.actions.subscribe((action) => {
    //   if (action.type === "[Component Name] Action Name") {
    //     localStorage.setItem("user", JSON.stringify(action["user"]));
    //   }
    // });
    // this.actions.pipe(
    //             ofType(loginActions.login),
    //             tap((action) => {
    //                 console.log(action);
                    
    //               localStorage.removeItem("user");
    //               this.router.navigate([""]);
    //             })
    //           )

  }

   // mostly effects are used to dispatch side effects
  // but in this case we dont need to dispatch
  loginEffect$ = createEffect(
    () =>
        
      this.actions.pipe(
        ofType(loginActions.login),
        tap((action) => {
            console.log("action",action);
            
          localStorage.setItem("user", JSON.stringify(action["user"]));
        })
      ),
    { dispatch: false }
  );


  logOutEffect$ = createEffect(
    () =>
      this.actions.pipe(
        ofType(loginActions.logout),
        tap((action) => {
            console.log("action",action);

          localStorage.removeItem("user");
          this.router.navigate([""]);
        })
      ),
    { dispatch: false }
  );

}
