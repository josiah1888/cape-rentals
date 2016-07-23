import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {House} from '../services/house.service';

@Component({
  selector: 'editable-house',
  templateUrl: './editable-house.component.html',
  styles: [`
    .fa.large {
      font-size: 32px;
      color: #369;
      margin: 10px;
    }

    .house {
        width: 100%;
        max-width: 980px;
    }

    .house__image img {
        width: 100%;
    }

    .details-boxes__key  {
        display: block;
        color: grey;
        text-transform: uppercase;
    }

    .detail-boxes__value {

    }

    .detail-boxes div {
        padding: 10px 45px;
        text-align: center;
        min-height: 112px;
    }

    .image {
      width: 100%;
      height: 300px;
      position: relative;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      text-align: center;
    }

    .image input {
      position: relative;
      top: 90%;
      width: 100%;
      max-width: 500px;
    }
  `]
})
export class EditableHouseComponent {
  @Input() house: House;
  // @Output() save: EventEmitter<House> = new EventEmitter();
  // @Output() cancel: EventEmitter<any> = new EventEmitter();
  // @Output() delete: EventEmitter<House> = new EventEmitter();
  // @Output() changeOrder: EventEmitter<{house: House, direction: number}> = new EventEmitter();
}