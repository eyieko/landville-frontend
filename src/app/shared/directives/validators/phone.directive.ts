import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { PhoneValidator } from 'src/app/shared/utils/validators/phone.validator';

@Directive({
  selector: '[phone][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PhoneDirective, multi: true }
  ]
})
export class PhoneDirective implements Validator {
  private validator = PhoneValidator();
  validate(control: AbstractControl): { [key: string]: any } {
    return this.validator(control);
  }
}
