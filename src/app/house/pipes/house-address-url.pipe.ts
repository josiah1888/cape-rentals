import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'houseAddressUrl'})
export class HouseAddressUrlPipe implements PipeTransform {
  transform(address: string): string {
    return address.toLowerCase().replace(/\s/g, '-').replace(/[^a-z0-9-]/g, '');
  }
}