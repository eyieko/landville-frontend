import { AbstractControl, ValidatorFn } from '@angular/forms';

const expression = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/;

export function PhoneValidator(): ValidatorFn {
  // return the `ValidatorFn` type function to handle validation
  return (control: AbstractControl): { [key: string]: any } => {
    console.log(control);
    const valid = expression.test(control.value) && control.value.length < 14;
    // validate control value against the expression
    return valid ? null : { phone: true };
  };
}
