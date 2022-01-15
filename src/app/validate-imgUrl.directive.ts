import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

export const imgUrlValidator = (control: AbstractControl): ValidationErrors | null => {
  const imgUrl = /^(http)?s?(:\/\/)/.test(control.value);
  if (imgUrl) {
    return null;
  }
  return {imgUrl: true};
}

@Directive({
  selector: 'AppImgUrl',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: ValidateImgUrlDirective,
    multi: true,
  }]
})
export class ValidateImgUrlDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return imgUrlValidator(control);
  }
}
