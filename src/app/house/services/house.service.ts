import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
// import {FirebaseService, BASE_URL} from '../../services/firebase.service';

import {House} from '../dto/house';
export {House} from '../dto/house';

@Injectable()
export class HouseService { // extends FirebaseService<House> {
    constructor() {
        // super(BASE_URL + 'houses/');
    }
    
    create(house: House) {
        // if (!house.id) {
        //     house.order = this.collection.length;
        // }

        // super.create(house);
    }
    
    delete(house: House) {
      // super.delete(house);
      // this.collection
      //   .filter(i => i.order > house.order)
      //   .forEach(i => {
      //     i.order--; this.update(i);
      //   });
    }
    
   changeOrder(house: House, direction: number) {
    // let housesToSwap = this.collection
    //   .filter(i => i.order === house.order + direction);
      
    // housesToSwap
    //   .forEach(i => {
    //     i.order -= direction;
    //     this.update(i);
    //   });
    
    // if (housesToSwap.length) {
    //   house.order += direction;
    //   this.update(house);
    // }
  }
}