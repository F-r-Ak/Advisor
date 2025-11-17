import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { OrgStructureJobTitlesService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditOrgStructureJobTitleComponent } from '../../components/add-edit-org-structure-job-title/add-edit-org-structure-job-title.component';

@Component({
  selector: 'app-org-structure-job-titles',
  standalone: true,
  imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
  templateUrl: './org-structure-job-titles.component.html',
  styleUrl: './org-structure-job-titles.component.scss'
})
export class OrgStructureJobTitlesComponent extends BaseListComponent {
  @Input() employeeId: string = '';
  isEnglish = false;
  service = inject(OrgStructureJobTitlesService);

  // ✅ Signal initialized at class level with static configuration
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({
    inputUrl: {
      getAll: 'v1/orgstructurejobtitles/getPaged',
      getAllMethod: 'POST',
      delete: 'v1/orgstructurejobtitles/deletesoft'
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
    responsiveDisplayedProperties: ['orgStructureName', 'jobTitleName']
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

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'orgStructureName',
        header: 'الهيكل الوظيفي',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'jobTitleName',
        header: 'الدور الوظيفي',
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
    this.openDialog(AddEditOrgStructureJobTitleComponent, this.localize.translate.instant('اضافة orgStructureJobTitles'), {
      pageType: 'add'
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditOrgStructureJobTitleComponent, this.localize.translate.instant('تعديل orgStructureJobTitles'), {
      pageType: 'edit',
      row: { rowData }
    });
  }
}
