import {Injectable} from "@angular/core";
import { Http } from '@angular/http';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FirebaseService, BASE_URL} from '../../services/firebase.service';

import {House} from '../dto/house';
export {House} from '../dto/house';

@Injectable()
export class HouseService extends FirebaseService<House> {
    constructor(private http: Http) {
        super(BASE_URL + 'houses/');
        this.http.get(`${BASE_URL}/houses.json`)
            .subscribe(res => {
                console.log('hey');
                this._collection = this._collection || [];
                let json = res.json();
                for (let house in json) {
                    this._collection.push(json[house]);
                    this.collection$.next(this.collection);
                }
            });
    }
    
    create(house: House) {
        if (!house.id) {
            house.order = this.collection.length;
        }

        super.create(house);
    }
    
    delete(house: House) {
      super.delete(house);
      this.collection
        .filter(i => i.order > house.order)
        .forEach(i => {
          i.order--; this.update(i);
        });
    }
    
   changeOrder(house: House, direction: number) {
    let housesToSwap = this.collection
      .filter(i => i.order === house.order + direction);
      
    housesToSwap
      .forEach(i => {
        i.order -= direction;
        this.update(i);
      });
    
    if (housesToSwap.length) {
      house.order += direction;
      this.update(house);
    }
  }
}