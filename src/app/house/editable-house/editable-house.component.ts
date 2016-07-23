import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {House} from '../services/house.service';

@Component({
  selector: 'editable-house',
  templateUrl: './editable-house.component.html'
})
export class EditableHouseComponent {
  @Input() house: House;
  // @Output() save: EventEmitter<House> = new EventEmitter();
  // @Output() cancel: EventEmitter<any> = new EventEmitter();
  // @Output() delete: EventEmitter<House> = new EventEmitter();
  // @Output() changeOrder: EventEmitter<{house: House, direction: number}> = new EventEmitter();
}