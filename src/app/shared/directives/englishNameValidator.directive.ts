import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { CustomValidationService } from '../../shared/';
@Directive({
  selector: '[appEnglishNamePattern]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: EnglishNamePatternDirective, multi: true }]
})
export class EnglishNamePatternDirective implements Validator {
  constructor(private customValidator: CustomValidationService) {}

  validate(control: AbstractControl): { [key: string]: any } | null {
    return this.customValidator.englishNamePatternValidator()(control);
  }
}
