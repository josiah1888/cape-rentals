import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {House, HouseService} from './services/house.service';
import {HouseComponent} from './house/house.component';
// import {EditableHouseComponent} from './editable-house/editable-house.component';
// import {LoginService} from '../login/login.service';
// import {FacebookService} from '../services/facebook.service'
;
@Component({
  selector: 'houses',
  directives: [HouseComponent],//, EditableHouseComponent],
  providers: [HouseService],
  styleUrls: ['./houses.component.css'],
  template: `
  Houses service right here!
    

  <div *ngFor="let house of houses$ | async">
        <house [house]="house"></house>
    </div>
    `
    // (save)="saveHouse($event)" (delete)="deleteHouse($event)"
//     <editable-house [house]="newHouse" *ngIf="newHouse" [hidden]="!newHouse" (save)="saveHouse($event)" (cancel)="cancel()"></editable-house>
//     <div class="text-center" *ngIf="hasAuth$ | async">
//         <button (click)="createNewHouse()" class="btn">Create New House</button>
//     </div>
})
export class HousesComponent {
//   hasAuth$: Observable<boolean>;
  houses$: Observable<House[]>;
//   newHouse: House = null;
  constructor() { //(private houseService: HouseService, private loginService: LoginService, private facebookService: FacebookService) {
    //   this.houses$ = houseService.collection$.map(i => i.sort(this.sortHouses));
    //   this.hasAuth$ = loginService.hasAuth$;
    this.houses$ = Observable.of([new House(), new House(), new House()]);
  }
  
//   createNewHouse() {
//       this.newHouse = new House();
//   }
  
//   saveHouse(house: House) {
//       this.houseService.create(house);
//       this.newHouse = null;
//   }
  
//   deleteHouse(house: House) {
//       this.houseService.delete(house);
//   }
  
//   cancel() {
//       this.newHouse = null;
//   }
  
//   sortHouses(a: House, b: House): number {
//     if (a.order < b.order) {
//         return -1;
//     } else if (a.order > b.order) {
//         return 1;
//     } else {
//         return 0;
//     }
//   }
  
//   ngAfterViewInit() {
//       setTimeout(() => this.facebookService.initShareButtons(), 1000);
//   }
}
