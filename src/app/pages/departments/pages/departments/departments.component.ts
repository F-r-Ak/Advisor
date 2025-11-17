import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { DepartmentsService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditDepartmentComponent } from '../../components/add-edit-department/add-edit-department.component';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent extends BaseListComponent {
  @Input() employeeId: string = '';
  isEnglish = false;
  service = inject(DepartmentsService);

  // ✅ Signal initialized at class level with static configuration
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({
    inputUrl: {
      getAll: 'v1/departments/getPaged',
      getAllMethod: 'POST',
      delete: 'v1/departments/deletesoft'
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
    this.tableOptions.update(options => ({
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
        field: 'name',
        header: 'القسم',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'branch',
        header: 'الفرع',
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
        call: row => {
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
    this.openDialog(AddEditDepartmentComponent, this.localize.translate.instant('اضافة قسم'), {
      pageType: 'add'
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditDepartmentComponent, this.localize.translate.instant('تعديل قسم'), {
      pageType: 'edit',
      row: { rowData }
    });
  }
}
