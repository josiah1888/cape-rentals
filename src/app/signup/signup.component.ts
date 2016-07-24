import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription'
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SignupService} from './signup.service';

@Component({
  selector: 'signup',
  providers: [SignupService],
  template: `
    <div class="row">
      <form [hidden]="hasAuth$ | async" (ngSubmit)="signup()" class="col-md-4 col-md-offset-4" #signupForm="ngForm">
          <h3>Cape Landlord Sign Up</h3>

          <div class="form-group">
            <label for="email">Email</label>
            <input class="form-control" type="email" [(ngModel)]="model.email" name="email" placeholder="joe@shmoe.com" required/>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input class="form-control" type="password" [(ngModel)]="model.password" name="password" placeholder="SecretPassword#!" required/>
          </div>
          <div class="form-group">
            <label for="name">Name</label>
            <input class="form-control" type="text" [(ngModel)]="model.name" name="name" required placeholder="Joe Shmoe"/>
          </div>
          <div class="form-group">
            <label for="licenserid">Licenser ID</label>
            <input class="form-control" type="text" [(ngModel)]="model.licenserId" name="licenserid" required placeholder="1460"/>
          </div>

          <button class="btn btn-default" type="submit" [disabled]="!signupForm.form.valid">Sign Up!</button>
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