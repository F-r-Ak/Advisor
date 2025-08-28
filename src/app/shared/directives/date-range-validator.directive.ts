import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    selector: '[dateRangeValidator]',
    standalone: true,
    providers: [{ provide: NG_VALIDATORS, useExisting: DateRangeValidatorDirective, multi: true }]
})
export class DateRangeValidatorDirective implements Validator {
    @Input() referenceControlName = '';

    validate(control: AbstractControl): ValidationErrors | null {
        if (!control.parent || !this.referenceControlName) {
            return null;
        }

        const referenceControl = control.parent.get(this.referenceControlName);

        if (!referenceControl) {
            return null;
        }

        // Get current values
        const fromDate = referenceControl.value ? new Date(referenceControl.value) : null;
        const toDate = control.value ? new Date(control.value) : null;

        if (!fromDate || !toDate) {
            return null;
        }

        // Clear any existing errors on both controls
        this.clearError(referenceControl, 'INVALID_DATE');
        this.clearError(control, 'INVALID_DATE');

        if (toDate < fromDate) {
            return { INVALID_DATE: true };
        }
        return null;
    }

    private clearError(control: AbstractControl, errorKey: string): void {
        if (control.errors?.[errorKey]) {
            delete control.errors[errorKey];
            if (Object.keys(control.errors).length === 0) {
                control.setErrors(null);
            }
        }
    }
}
