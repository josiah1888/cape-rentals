import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription'
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SignupService} from './signup.service';

@Component({
  selector: 'signup',
  providers: [SignupService],
  template: `
    <div class="margin--small">
      <form [hidden]="hasAuth$ | async" (ngSubmit)="signup()" class="margin--small text-center" #signupForm="ngForm">
          <div>Sign up to list your Cape Girardeau rental properties here</div>
          <div>Email: <input type="email" [(ngModel)]="model.email" name="email" required/></div>
          <div>Password: <input type="password" [(ngModel)]="model.password" name="password" required/></div>
          <div>Name: <input type="text" [(ngModel)]="model.name" name="name" required/></div>
          <div>License ID: <input type="text" [(ngModel)]="model.licenserId" name="licenserId" required/></div>
          <div><button class="btn" type="submit" [disabled]="!signupForm.form.valid">Sign Up!</button></div>
      </form>
    </div> 
  `
})
export class SignupComponent {
  signupSuccess$: Observable<boolean>;
  signupSuccessSub: Subscription;
  constructor(private router: Router, private signupService: SignupService) {
    this.signupSuccess$ = this.signupService.signupSuccess$;
  }
  
  signup() {
    this.signupService.signup(this.model);
    this.signupSuccessSub = this.signupSuccess$
      .subscribe((signedup) => {
        if (signedup) {
          this.router.navigateByUrl('/landlords/' + this.model.licenserId);
        }
      });
  }

  model : SignupInfo = {email: '', password: '', name: '', licenserId: ''};
}

export interface SignupInfo {
  email: string, password: string, name: string, licenserId: string
}