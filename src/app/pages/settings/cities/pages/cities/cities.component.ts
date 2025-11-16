import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { CitiesService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { AddEditCitiesComponent } from '../../components/add-edit-cities/add-edit-cities.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-cities',
  standalone: true,
  imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.scss'
})
export class CitiesComponent extends BaseListComponent {
  @Input() employeeId: string = '';
  isEnglish = false;
  tableOptions!: WritableSignal<TableOptions>;
  service = inject(CitiesService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.localize.currentLanguage$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(lang => {
      this.language.set(lang);
      this.initializeTableOptions();
    });
  }

  initializeTableOptions() {
    this.tableOptions = signal({
      inputUrl: {
        getAll: 'v1/cities/getPaged',
        getAllMethod: 'POST',
        delete: 'v1/cities/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'ADVISOR-SYSTEM-EXPERIENCES',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {}
      },
      responsiveDisplayedProperties: ['code', 'nameAr', 'nameEn', 'countryName']
    });
  }

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
      },
      {
        field: this.language() === 'ar' ? 'countryNameAr' : 'countryNameEn',
        header: 'اسم الدولة',
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
    this.openDialog(AddEditCitiesComponent, this.localize.translate.instant('اضافة مدينة'), {
      pageType: 'add'
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditCitiesComponent, this.localize.translate.instant('تعديل مدينة'), {
      pageType: 'edit',
      row: { rowData }
    });
  }
}
