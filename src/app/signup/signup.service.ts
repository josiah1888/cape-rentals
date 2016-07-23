import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FirebaseService, BASE_URL} from '../services/firebase.service'
import {SignupInfo} from './signup.component';

@Injectable()
export class SignupService extends FirebaseService<any> {
    public signupSuccess$: BehaviorSubject<boolean>
    constructor() {
        super(BASE_URL + 'users');
         this.signupSuccess$ = new BehaviorSubject(false);
    }

   signup(signupInfo: SignupInfo) {
       this.firebase.createUser(
           {email: signupInfo.email, password: signupInfo.password},
           (error, userData) => {
               this.signupSuccess$.next(Boolean(!error));
           })
   }
}
  