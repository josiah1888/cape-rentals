import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {House, HouseService} from '../house/services/house.service';
import {HouseComponent} from '../house/house/house.component';
import {LoginService} from '../login/login.service';
;
@Component({
  selector: 'landlords',
  directives: [HouseComponent],
  providers: [HouseService, LoginService],
  template: `
    <div *ngFor="let house of houses$ | async">
        <house [house]="house" [isOwnerView]="true" (save)="saveHouse($event)" (delete)="deleteHouse($event)"></house>
    </div>
    `
})
export class LandlordComponent {
  hasAuth$: Observable<boolean>;
  houses$: Observable<House[]>;
  newHouse: House = null;
  sub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private houseService: HouseService, 
    private loginService: LoginService) {
     
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
        let id = params['id'];
        this.houses$ = this.houseService.collection$
            .map(i => i.filter(j => j.licenserId.toString() === id))
            .map(i => i.sort(this.sortHouses));
        this.hasAuth$ = this.loginService.hasAuth$;
    });
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }
  
  createNewHouse() {
      this.newHouse = new House();
  }
  
  saveHouse(house: House) {
      console.log(house);
      this.houseService.update(house);
      this.newHouse = null;
  }
  
  deleteHouse(house: House) {
      this.houseService.delete(house);
  }
  
  cancel() {
      this.newHouse = null;
  }
  
  sortHouses(a: House, b: House): number {
    if (a.order < b.order) {
        return -1;
    } else if (a.order > b.order) {
        return 1;
    } else {
        return 0;
    }
  }
}
