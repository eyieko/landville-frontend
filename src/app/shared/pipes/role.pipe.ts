import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleTransform'
})
export class RoleTransformPipe implements PipeTransform {
  transform(role: string): string {
    const roles = { CA: 'Client Admin', LA: 'LandVille Admin', BY: 'Buyer' };
    return roles[role];
  }
}
