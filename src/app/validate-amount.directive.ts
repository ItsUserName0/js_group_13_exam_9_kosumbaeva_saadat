import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

export const amountValidator = (control: AbstractControl): ValidationErrors | null => {
  if (control.value < 0.1) {
    return {amount: true};
  }
  return null;
}

@Directive({
  selector: '[appAmount]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateAmountDirective,
    multi: true,
  }]
})
export class ValidateAmountDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return amountValidator(control);
  }
}
