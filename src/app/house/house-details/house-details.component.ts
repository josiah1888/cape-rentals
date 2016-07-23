import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import {House, HouseService} from '../services/house.service';
import {HouseComponent} from '../house/house.component';
import {EditableHouseComponent} from '../editable-house/editable-house.component';
import {HouseAddressUrlPipe} from '../pipes/house-address-url.pipe';
// import {LoginService} from '../../login/login.service';
// import {FacebookService} from '../../services/facebook.service';

@Component({
  selector: 'houses-details',
  directives: [HouseComponent, EditableHouseComponent],
  template: `
    <house *ngIf="house$ | async" [house]="house$ | async" (save)="saveHouse($event)" (delete)="deleteHouse($event)"></house>
  `
})
export class HouseDetailsComponent {
  @Input() house: House;
  // @Output() save: EventEmitter<House> = new EventEmitter();
  // @Output() delete: EventEmitter<House> = new EventEmitter();
  hasAuth$: Observable<boolean>;
  house$: Observable<House>;
  houseSubscription: Subscription;
  pipe = new HouseAddressUrlPipe();
  
  constructor() {//(private houseService: HouseService, private loginService: LoginService, private facebookService: FacebookService) {
    // let path = window.location.pathname;
    // let address = path.substr(path.lastIndexOf('/') + 1);
    
    // this.house$ = houseService.collection$.map(i => i.find(j => this.pipe.transform(j.address) === address));
    // this.hasAuth$ = loginService.hasAuth$;
  }
  
  ngAfterViewInit() {
      // this.facebookService.initShareButtons();
  }
}
