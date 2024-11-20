import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from "@angular/router";
import { select, Store } from "@ngrx/store";
import { AuthState } from "./auth/reducers";
import { loginActions } from "./auth/authstore/action-types";
import { User } from "./auth/model/user.model";
import { isLoggedInSelector } from "./auth/authstore/login.selector";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loading = true;
  public isLoggedIn$: Observable<boolean>=of(false);
  public user:User


  constructor(private router: Router,
              private store: Store) 
   {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    // this is used to get the user from the store and update the login status
    // but this will trigger every time the store is updated in any part of the app
    // to overcome his we can use selector called select
    // this.store.subscribe((data)=>{
    //   console.log(data);
    //   this.user=data['login']?.user
    //   this.isLoggedIn$ = of(data['login']?.user?.isLoggedIn) || of(false);
    // })
    // this is used to get the user from the store and update the login status only when there is a change in the  value
    // we an also create a feature selector to get the value of that particular feature
  //  this.isLoggedIn$= this.store.pipe((
  //     select(state =>state['login']?.user?.isLoggedIn)
  //   ))
  let user = localStorage.getItem('user')
  if(user){
    this.store.dispatch(loginActions.login({user:JSON.parse(user)}))
  }
  
    this.isLoggedIn$= this.store.pipe((
      select(isLoggedInSelector)
    ))

  }

  logout() {
    let user:User=undefined
    this.store.dispatch(loginActions.logout({user}))
    this.router.navigate([''])
  }
}
