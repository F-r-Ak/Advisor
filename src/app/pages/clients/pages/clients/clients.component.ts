import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ClientsService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AddEditClientsComponent } from '../../components/add-edit-clients/add-edit-clients.component';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent extends BaseListComponent {
  @Input() employeeId: string = '';
  isEnglish = false;
  service = inject(ClientsService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  // ✅ signal لازم تتعرف مرة واحدة هنا مش جوا function
  tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({
    inputUrl: {
      getAll: 'v1/client/getPaged',
      getAllMethod: 'POST',
      delete: 'v1/client/deletesoft'
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
    responsiveDisplayedProperties: ['code', 'nameAr', 'nameEn']
  });

  // ✅ effect في Injection Context (Field-based)
  langEffect = effect(() => {
    const lang = this.localize.currentLanguage();
    this.language.set(lang);

    // update table dynamically when language changes
    this.tableOptions.update(options => ({
      ...options,
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions()
    }));
  });

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field: 'code',
        header: 'الكود',
        filter: true,
        filterMode: 'text'
      },
      {
        field: this.language() === 'ar' ? 'nameAr' : 'nameEn',
        header: 'مسمي الفرع',
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
    this.openDialog(AddEditClientsComponent, this.localize.translate.instant('اضافة عميل'), {
      pageType: 'add'
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditClientsComponent, this.localize.translate.instant('تعديل بيانات عميل'), {
      pageType: 'edit',
      row: { rowData }
    });
  }
}
