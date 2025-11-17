import { OnInit, inject, Directive, DestroyRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../core';
import { TranslationService } from '../../shared';
import { ExportExcelService } from '../../shared/services/export-excel/export-excel.service';

@Directive()
export abstract class BaseComponent implements OnInit, OnDestroy {
  pageTitle = '';
  pageType = '';

  // ✅ بديل للـ Subject التقليدي لإدارة عمر الاشتراكات والـ effects
  protected destroyRef = inject(DestroyRef);

  protected alert = inject(AlertService);
  protected router = inject(Router);
  excel = inject(ExportExcelService);
  protected localize = inject(TranslationService);

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = this.activatedRoute.snapshot.data['pageTitle'] || '';
    this.pageType = this.activatedRoute.snapshot.data['pageType'] || '';
  }

  ngOnDestroy(): void {
    // ✅ مش محتاج تبعت next أو complete زي زمان
    // Angular بيهندل التدمير تلقائيًا مع DestroyRef
  }
}
