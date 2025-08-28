import { inject, Injectable } from '@angular/core';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { ConfigService } from '../../../core';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {
  config = inject(ConfigService);

  http = inject(HttpClient);
  patternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  englishNamePatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[a-zA-Z ]{2,100}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidEnglishName: true };
    };
  }
  deviceEnglishNamePatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[a-zA-Z ][0-9]{2,100}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidEnglishName: true };
    };
  }
  arabicNamePatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[\u0621-\u064A ]{2,100}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidArabicName: true };
    };
  }

  deviceArabicNamePatternValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^[\u0621-\u064A ][0-9]{2,100}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidArabicName: true };
    };
  }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup): { [key: string]: any } | null => {
      const passwordControl = formGroup?.controls[password];
      const confirmPasswordControl = formGroup?.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  nationalIdValidator(userControl: AbstractControl, userId?: any) {
    let url = this.config.getAppUrl('CHECK-NATIONAL-ID');
    if (userId !== '') {
      url = url + userControl.value + '/' + userId;
    } else {
      url = url + userControl.value + '/' + 0;
    }
    const obs = this.http.get(url).pipe(
      map((res: any) => {
        return res.data ? { nationalIdNotAvailable: true } : null;
      })
    );
    return obs;
  }
  emailValidator(userControl: AbstractControl, userId?: any) {
    let url = this.config.getAppUrl('CHECK-EMAIL');
    if (userId !== '') {
      url = url + userControl.value + '/' + userId;
    } else {
      url = url + userControl.value + '/' + 0;
    }
    const obs = this.http.get(url).pipe(
      map((res: any) => {
        return res.data ? { emailNotAvailable: true } : null;
      })
    );
    return obs;
  }
}
