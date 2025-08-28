import { Directive, forwardRef, Input } from '@angular/core';
import { AbstractControl, NG_ASYNC_VALIDATORS, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidationService } from '../../shared/';

@Directive({
    selector: '[appValidateNationalId]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => ValidateNationalIdDirective),
            multi: true
        }
    ],
    standalone: false
})
export class ValidateNationalIdDirective implements AsyncValidator {
  @Input('appValidateNationalId') userId!: string;
  constructor(private customValidator: CustomValidationService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const obs = this.customValidator.nationalIdValidator(control, this.userId);
    return obs;
  }
}
