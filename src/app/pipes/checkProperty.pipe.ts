import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CheckProperty'
})

export class CheckProperty implements PipeTransform {
    transform(propertyId: string, myProperties: any): boolean {
        const findProperty = myProperties.find(({id}) => id === propertyId);
        if (findProperty) {
          return true;
        }
        return false;
    }
  }
