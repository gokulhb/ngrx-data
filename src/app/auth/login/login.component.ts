import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import { Store } from '@ngrx/store';
import { AuthState } from '../reducers';
import { noop, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { loginActions } from '../authstore/action-types';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
 

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
    private store:Store<AuthState>) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {

    let formValue = this.form.getRawValue()
    this.auth.login(formValue?.email,formValue?.password,true).pipe(tap((user)=>{
      user={
        ...user,
        isLoggedIn:true
      }
      let action= loginActions.login({user})
      this.store.dispatch(action)
      this.router.navigate(['/courses'])
    }))
    .subscribe(noop,()=> alert("Login failed"))

  }

}

