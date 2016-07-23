import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {House, HouseService} from '../services/house.service';
import {EditableHouseComponent} from '../editable-house/editable-house.component';
import {HouseAddressUrlPipe} from '../pipes/house-address-url.pipe';
import {LoginService} from '../../login/login.service';
// import {FacebookService} from '../../services/facebook.service';

@Component({
  selector: 'house',
  templateUrl: './house.component.html',
  styleUrls: ['./house.css'],
  directives: [EditableHouseComponent]
})
export class HouseComponent {
  @Input() house: House;
  // @Output() save: EventEmitter<House> = new EventEmitter();
  // @Output() delete: EventEmitter<House> = new EventEmitter();
  hasAuth$: Observable<boolean>;
  pipe: HouseAddressUrlPipe = new HouseAddressUrlPipe();
  editableHouse: House;
  
  constructor(private houseService: HouseService, private loginService: LoginService) { //, private facebookService: FacebookService) {
    this.hasAuth$ = loginService.hasAuth$;
  }
  
  ngOnInit() {
    this.editableHouse = Object.assign({}, this.house);
  }
  
  changeOrder({house, direction}: {house: House, direction: number}) {
    this.houseService.changeOrder(house, direction);
  }
  
  // ngAfterViewInit() {
  //   this.initFacebookShare();
  // }
  
  // initFacebookShare() {
  //   let url = window.location.href;
  //   let addressUrl = this.pipe.transform(this.house.address);
  //   if (!url.includes(addressUrl)) {
  //     url += addressUrl;
  //   }
    
  //   this.facebookService.setShareButtonAttribute(this.house.id, url);
  // }
}

