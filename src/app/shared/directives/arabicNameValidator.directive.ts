import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CustomValidationService } from '../../shared/';
@Directive({
  selector: '[appArabicNamePattern]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: ArabicNamePatternDirective, multi: true }]
})
export class ArabicNamePatternDirective implements Validator {
  constructor(private customValidator: CustomValidationService) {}

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.arabicNamePatternValidator()(control);
  }
}
