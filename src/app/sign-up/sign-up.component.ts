import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription'
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'login',
  providers: [],
  template: `
    <div class="margin--small  text-center">
        <form [hidden]="hasAuth$ | async" (ngSubmit)="login()" class="margin--small" #loginForm="ngForm">
            <div>Sign up to list your Cape Girardeau rental properties here</div>
            <div>Email: <input type="email" [(ngModel)]="model.email" name="email" required/></div>
            <div>Password: <input type="password" [(ngModel)]="model.password" name="password" required/></div>
            <div><button class="btn" (click)="signup()" type="submit" [disabled]="!loginForm.form.valid">Login</button></div>
        </form>
        <div [hidden]="!(hasAuth$ | async)">
            <button class="btn" (click)="logout()">Logout</button>
        </div>
    </div> 
  `
})
export class LoginComponent {
  hasAuth$: Observable<boolean>;
  hasAuthSub: Subscription;
  constructor(private router: Router) {
  }
  
  ngOnInit() {
  }
  
  ngOnDestroy() {
  }
}
