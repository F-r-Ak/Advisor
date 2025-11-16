import { Injectable, Renderer2, RendererFactory2, signal, computed, effect, WritableSignal, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Language, Languages } from '../../../core/enums/languages';
import { StorageService } from '../../../core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private defaultLang: Language = Languages.AR;

  private _currentLanguage: WritableSignal<Language> = signal(this.defaultLang);
  readonly currentLanguage = computed(() => this._currentLanguage());

  private storageService = inject(StorageService);

  private renderer: Renderer2;

  constructor(
    public translate: TranslateService,
    private rendererFactory: RendererFactory2
  ) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.initLanguage();
    this.storageService.setLocal('currentLang', this._currentLanguage());
  }

  private getStoredLanguage(): Language | null {
    return this.storageService.getLocal('currentLang') as Language | null;
  }

  private initLanguage(): void {
    const lang = this._currentLanguage();
    this.translate.setFallbackLang(lang);
    this.translate.use(lang);
    this.handleBasicLogic(lang);
  }

  changeLanguage(): void {
    const newLang = this._currentLanguage() === Languages.AR ? Languages.EN : Languages.AR;
    this._currentLanguage.set(newLang);
    this.storageService.setLocal('currentLang', newLang);

    this.translate.use(newLang);
    this.handleBasicLogic(newLang);
  }

  isEnglish(): boolean {
    return this._currentLanguage() === Languages.EN;
  }

  private handleBasicLogic(lang: Language): void {
    const html = document.documentElement;
    const body = document.body;
    const isArabic = lang === Languages.AR;
    const dir = isArabic ? 'rtl' : 'ltr';

    this.renderer.setAttribute(body, 'dir', dir);
    this.renderer.setAttribute(html, 'dir', dir);
    this.renderer.setAttribute(html, 'lang', lang);
    this.renderer.addClass(body, dir);
    this.renderer.removeClass(body, isArabic ? 'ltr' : 'rtl');
  }

  private applyLanguage(lang: Language): void {
    this.translate.use(lang);
    this.handleBasicLogic(lang);
  }

  private languageEffect = effect(() => {
    const lang = this._currentLanguage();
    this.applyLanguage(lang);
  });
}
