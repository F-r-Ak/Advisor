import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { JobTitlesService } from '../../../../../shared/services/settings/job-titles/job-titles.service';
import { AddEditJobTitlesComponent } from '../../components/add-edit-job-titles/add-edit-job-titles.component';

@Component({
  selector: 'app-job-titles',
  imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
  templateUrl: './job-titles.component.html',
  styleUrl: './job-titles.component.scss'
})
export class JobTitlesComponent extends BaseListComponent {
  @Input() employeeId: string = '';
  isEnglish = false;
  service = inject(JobTitlesService);

  // ✅ Signal initialized at class level with static configuration
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({
    inputUrl: {
      getAll: 'v1/jobtitles/getpaged',
      getAllMethod: 'POST',
      delete: 'v1/jobtitles/deletesoft'
    },
    inputCols: [],
    inputActions: [],
    permissions: {
      componentName: 'ADVISOR-SYSTEM-EXPERIENCES',
      allowAll: true,
      listOfPermissions: []
    },
    bodyOptions: {
      filter: {}
    },
    responsiveDisplayedProperties: ['name', 'description']
  });

  // ✅ Effect at class level (not in ngOnInit)
  langEffect = effect(() => {
    const lang = this.localize.currentLanguage();
    this.language.set(lang);

    // Update only dynamic parts using .update()
    this.tableOptions.update((options) => ({
      ...options,
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions()
    }));
  });

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: this.language() === 'ar' ? 'name' : 'nameEn',
        header: 'المسمى الوظيفة',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'description',
        header: 'وصف المسمى الوظيفى',
        filter: true,
        filterMode: 'text'
      }
    ];
  }

  initializeTableActions(): TableOptions['inputActions'] {
    return [
      {
        name: 'Edit',
        icon: 'pi pi-file-edit',
        color: 'text-middle',
        isCallBack: true,
        call: (row) => {
          this.openEdit(row);
        },
        allowAll: true
      },
      {
        name: 'DELETE',
        icon: 'pi pi-trash',
        color: 'text-error',
        allowAll: true,
        isDelete: true
      }
    ];
  }

  openAdd() {
    this.openDialog(AddEditJobTitlesComponent, this.localize.translate.instant('اضافة مسمى وظيفى '), {
      pageType: 'add'
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditJobTitlesComponent, this.localize.translate.instant('تعديل مسمى وظيفى'), {
      pageType: 'edit',
      row: { rowData }
    });
  }
}
