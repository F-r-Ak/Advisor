import { OnInit, inject, Directive } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../core';
import { TranslationService } from '../../shared';
import { ExportExcelService } from '../../shared/services/export-excel/export-excel.service';

@Directive()
export abstract class BaseComponent implements OnInit {
  pageTitle = '';
  pageType = '';

  alert = inject(AlertService);
  route = inject(Router);
  excel = inject(ExportExcelService);
  localize = inject(TranslationService);

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.pageTitle = this.activatedRoute.snapshot.data['pageTitle'] || '';
    this.pageType = this.activatedRoute.snapshot.data['pageType'] || '';
  }
}
