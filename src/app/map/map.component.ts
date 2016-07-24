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
  providers: [GoogleApiService, HouseService],
  directives: [HouseComponent],
  styles: [`
    .map {
      margin: 10px 50px;
    }
  `],
  template: `
    <div class="margin--small">
    <house *ngIf="house" [house]="house" (save)="save($event)" (delete)="delete($event)"></house>
      <div class="map" id="map" [style.height]="height"></div>
      
      <button id="mapbtn" type="button" (click)="showHouse()" style="display: none;" ></button>
    </div> 
  `
})
export class MapComponent {
    height = '600px';
    myLatLng = {lat: 37.2993594, lng: -89.5633772};
    // min: 37.2993594,-89.5633772
    // max: 37.3233942,-89.514869
    map:any;
    house: House;
    sub: Subscription;

  constructor(private router: Router, private googleApi: GoogleApiService, private houseService: HouseService) {
  }

  ngOnInit() {
    this.googleApi.initMap().then(() => {
      let latlng = new google.maps.LatLng(this.myLatLng.lat, this.myLatLng.lng);

      this.map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(37.3067429,-89.5286194),
        zoom: 13
      });

      let markers = [];

      this.sub = this.houseService.collection$.subscribe(houses => {
        houses
          .filter(house => house.id !== '-KNOYsPtzrgTJBFfrL4p' && house.id !== '-KNOccOVEazMBm5fUUIP')
          .map(house => {
            if (markers.map(marker => marker.houseId).indexOf(house.id) === -1) {
              markers.push(new google.maps.Marker({
                position: new google.maps.LatLng(this.myLatLng.lat + Math.random() * .03, this.myLatLng.lng + Math.random() * .05),
                map: this.map,
                title: house.address,
                houseId: house.id
              }));

              markers.map(i => {
                i.addListener('click', () => {
                  window['mapbtn'].attributes['houseid'] = i.houseId;
                  window['mapbtn'].click();
                });
              });
            }
        });
      });

      markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(37.3069353, -89.5214493),
        map: this.map,
        title: 'CodeFi',
        houseId: '-KNOYsPtzrgTJBFfrL4p'
      }));

      markers.push(new google.maps.Marker({
        position: new google.maps.LatLng(37.305724, -89.5344137),
        map: this.map,
        title: 'Josiah\'s House',
        houseId: '-KNOccOVEazMBm5fUUIP'
      }));

      markers.map(i => {
        i.addListener('click', () => {
          window['mapbtn'].attributes['houseid'] = i.houseId;
          window['mapbtn'].click();
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  showHouse() {
    let houseId = window['mapbtn'].attributes['houseid'];
    this.house = this.houseService.collection.find(i => i.id === houseId);
  }

  save(house: House) {
    this.houseService.update(house);
  }

  delete(house: House) {
    this.houseService.delete(house);
  }
}