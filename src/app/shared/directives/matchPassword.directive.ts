import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';
import { CustomValidationService } from '../../shared/';

@Directive({
  selector: '[appMatchPassword]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchPasswordDirective, multi: true }]
})
export class MatchPasswordDirective implements Validator {
  @Input('appMatchPassword') MatchPassword: string[] = [];

  constructor(private customValidator: CustomValidationService) {}

  validate(formGroup: FormGroup): ValidationErrors | any {
    // return this.customValidator.MatchPassword(this.MatchPassword[0], this.MatchPassword[1])(formGroup);
  }
}
