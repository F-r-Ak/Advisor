import { Directive, Input } from '@angular/core';
import { FormControl, AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[specificLanguage]',
  standalone: true,
  providers: [{ provide: NG_VALIDATORS, useExisting: SpecificLanguageDirective, multi: true }]
})
export class SpecificLanguageDirective {
  @Input() specificLanguage = '';

  constructor() {}

  validate(control: FormControl) {
    if (!control.value) {
      return null;
    }
    return this.validateLanguageFactory(control);
  }

  validateLanguageFactory(control: AbstractControl): { [key: string]: boolean } | null {
    const isValid = this.validateLanguage(control.value, this.specificLanguage);
    if (isValid) {
      return null;
    } else {
      return this.generateError(this.specificLanguage);
    }
  }

  validateLanguage(text: string, language: string): boolean {
    let regex: RegExp = /^/;

    switch (language) {
      case 'ar':
        regex = /^[\u0600-\u06FF0-9 ~_?`!@#$%^&*()+=|;':",.\-\/\\]*$/; // arabic characters with spaces and numbers
        break;
      case 'en':
        regex = /^[a-zA-Z0-9 ~_?`!@#$%^&*()+=|;':",.\-\/\\]*$/; // english characters with spaces and numbers
        break;
      default:
        break;
    }

    return regex.test(text);
  }

  generateError(lang: string): { [key: string]: boolean } {
    let error;

    if (lang === 'ar') {
      error = { arabic_word: true };
    } else {
      error = { english_word: true };
    }

    return error;
  }
}
