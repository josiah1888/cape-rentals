import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription'
import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {GoogleApiService} from '../services/google-api.service';
import {HouseService, House} from '../house/services/house.service';
import {HouseComponent} from '../house/house/house.component';

declare let google: any;

@Component({
  selector: 'map',
  providers: [GoogleApiService],
  directives: [HouseComponent],
  styles: [`
    .map {
      margin: 10px 50px;
    }
  `],
  template: `
    <div class="margin--small">
    <house *ngIf="house" [house]="house" (save)="save($event)" (delete)="delete($event)"></house>
        Here lies the map
      <div class="map" id="map" [style.height]="height"></div>


  
      <button id="mapbtn1" type="button" (click)="showHouse('-KNOYsPtzrgTJBFfrL4p')" style="display: none;" ></button>
      <button id="mapbtn2" type="button" (click)="showHouse('-KNOccOVEazMBm5fUUIP')" style="display: none;" ></button>
    </div> 
  `
})
export class MapComponent {
    height = '600px';
    myLatLng = {lat: 37.3069353, lng: -89.5214493};
    map:any;
    house: House;

  constructor(private router: Router, private googleApi: GoogleApiService, private houseService: HouseService) {
  }

  ngOnInit() {
    this.googleApi.initMap().then(() => {
      let latlng = new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng);

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 13
      });

      let marker1 = new google.maps.Marker({
        position: latlng,
        map: this.map,
        title: 'CodeFi',
        houseId: '-KNOYsPtzrgTJBFfrL4p'
      });

      marker1.addListener('click', () => {
        window['mapbtn1'].click();      
      });

      let marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(37.305724, -89.5344137),
        map: this.map,
        title: 'Josiah\'s House',
        houseId: '-KNOccOVEazMBm5fUUIP'
      });

      marker2.addListener('click', () => {
        window['mapbtn2'].click();      
      });
    });
  }

  showHouse(houseId) {
    this.house = this.houseService.collection.find(i => i.id === houseId);
  }

  save(house: House) {
    this.houseService.update(house);
  }

  delete(house: House) {
    this.houseService.delete(house);
  }
}