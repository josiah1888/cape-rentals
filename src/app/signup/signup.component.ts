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
    <strong>General Requirements</strong> 
    <p>
      The dwelling is to be safe, clean, sanitary, fit for human occupancy and comply with all applicable legal requirements of the state and the city, including the following requirements:
    </p> 
  <ol>
    <li>
      Maintenance of shared or public areas.
    </li>
    <li>
      Maintenance of occupied areas.
    </li>
    <li>
      Pest extermination.
    </li>
    <li>
      Sanitary fixtures and appliances.
    </li>
    <li>
      Minimum heating and maintenance.
    </li>
    <li>
      Minimum exterior lighting.
    </li>
    <li>
      Minimum standards for food preparation, cooking equipment and associated facilities:
    </li>
    <li>
      A kitchen sink in good working condition, that is connected to an approved water supply including hot and cold water and also is connected to an approved sewer system,
    </li>
    <li>
      Cabinets or shelves, for the storage of eating, drinking and cooking equipment and utensils,
    </li>
    <li>
      Adequate space and hook-ups shall be provided for a stove, or similar device for cooking food and a refrigerator, or similar device.
    </li>
    <li>
      Toilet facilities supplied with a flushing toilet in good working condition connected to an approved water and sewer system.
    </li>
    <li>
      Lavatory sink connected to approved water system with both hot and cold water and sewer system in the same room or adjacent to toilet facilities.
    </li>
    <li>
      Working bathtub or shower connected to approved water system with hot and cold water and connected to an approved sewer system.
    </li>
    <li>
      Meet current city egress codes.
    </li>
    <li>
      Handrails for steps with 4 risers or more, and guards on porches, decks and balconies 30 inches above ground or floor level.
    </li>
    <li>
      Access and egress from each dwelling.
    </li>
    <li>
      Exterior door locks.
    </li>
    <li>
      Habitable room ventilation: where ventilation is provided by windows alone, windows must be operable and capable of remaining in the open position.
    </li>
    <li>
      Other room ventilation: every bathroom and water closet compartment, and every laundry and utility room ventilated by mechanical means shall be exhausted to the outdoors and shall not be recirculated to any interior space.
    </li>
    <li>
      Electric service, outlets and fixtures shall comply with Section 604 and 605 of the 2009 International Property Maintenance Code.
    </li>
    <li>
      Foundations, exterior walls and roofs in good repair.
    </li>
    <li>
      Exterior windows and doors will close tightly and kept in operable condition.
    </li>
    <li>
      Floors, interior walls and ceilings shall be kept in sound condition and good repair.
    </li>
    <li>
      Buildings and every attachment thereto shall be safe to use and capable of supporting loads that may be anticipated to be placed on them in normal use.
    </li>
    <li>
      Occupancy per dwelling unit: Not more than one family, except for temporary guests, shall occupy a dwelling unit, unless otherwise authorized by the zoning ordinance.
    </li>
    <li>
      Every bedroom shall have a minimum floor area of 70 square feet. Rooms or areas of unfinished basements shall not be used as bedrooms.
    </li>
    <li>
      Smoke Detector: owners of all buildings which fall under this ordinance shall provide a minimum of one approved single-station smoke detector in each bedroom, one smoke detector in the area outside of the bedrooms, and one smoke detector on each floor level including the basement.
    </li>
    <li>
      Utilities in occupied units must be maintained in working order.
    </li>
</ol>
      <form [hidden]="hasAuth$ | async" (ngSubmit)="signup()" class="margin--small text-center" #signupForm="ngForm">
          <div>Sign up to list your Cape Girardeau rental properties here</div>
          <div>Email: <input type="email" [(ngModel)]="model.email" name="email" required/></div>
          <div>Password: <input type="password" [(ngModel)]="model.password" name="password" required/></div>
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
    this.signupService.signup(this.model.email, this.model.password);
    this.signupSuccessSub = this.signupSuccess$
      .subscribe((signedup) => {
        if (signedup) {
          this.router.navigateByUrl('/');
        }
      });
  }

  model = {email: '', password: ''};
}
