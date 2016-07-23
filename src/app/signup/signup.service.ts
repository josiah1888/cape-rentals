import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FirebaseService} from '../services/firebase.service'

@Injectable()
export class SignupService extends FirebaseService<any> {
    public signupSuccess$: BehaviorSubject<boolean>
    constructor() {
        super();
         this.signupSuccess$ = new BehaviorSubject(false);
    }

   signup(email: string, password: string) {
       this.firebase.createUser(
           {email: email, password: password},
           (error, userData) => this.signupSuccess$.next(Boolean(!error))
           )
   }
}
  