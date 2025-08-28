import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CustomValidationService } from '../../shared/';

@Directive({
  selector: '[appPasswordPattern]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordPatternDirective, multi: true }]
})
export class PasswordPatternDirective implements Validator {
  constructor(private customValidator: CustomValidationService) {}

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.patternValidator()(control);
  }
}
