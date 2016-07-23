import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription'
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from './login.service';

@Component({
  selector: 'login',
  providers: [LoginService],
  template: `
    <div class="margin--small  text-center">
        <form [hidden]="hasAuth$ | async" (ngSubmit)="login()" class="margin--small" #loginForm="ngForm">
            <div>Email: <input type="email" [(ngModel)]="model.email" name="email" required/></div>
            <div>Password: <input type="password" [(ngModel)]="model.password" name="password" required/></div>
            <div><button class="btn" (click)="login()" type="submit" [disabled]="!loginForm.form.valid">Login</button></div>
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
  constructor(private loginService: LoginService, private router: Router) {
      this.hasAuth$ = loginService.hasAuth$;
  }
  
  ngOnInit() {
      this.hasAuthSub = this.hasAuth$.subscribe(hasAuth => {
          if (hasAuth) {
              this.router.navigateByUrl('/');
          }
        });
  }
  
  ngOnDestroy() {
      this.hasAuthSub.unsubscribe();
  }
  
  login() {
      this.loginService.login(this.model.email, this.model.password);
  }
  
  logout() {
      this.loginService.logout();
  }

  model = {email: '', password: ''};
  submitted = false;
}
