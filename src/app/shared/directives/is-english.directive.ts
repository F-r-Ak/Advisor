import { Directive, EventEmitter, Output, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '../services/translation/translation.service';
import { Languages } from '../../core/enums/languages';

@Directive({
    selector: '[isEnglish]',
    standalone: true
})
export class IsEnglishDirective {
    private translationService = inject(TranslationService);

    @Output() isEnglish = new EventEmitter<boolean>(true);

    constructor() {
        this.getCurrentLanguage();
    }

    private getCurrentLanguage() {
        this.translationService.currentLanguage$.pipe(takeUntilDestroyed()).subscribe((land) => this.isEnglish.emit(land === Languages.EN));
        setTimeout(() => this.isEnglish.emit(this.translationService.isEnglish()));
    }
}
