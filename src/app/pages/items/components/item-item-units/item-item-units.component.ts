import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { CardModule } from 'primeng/card';
import { ItemItemUnitsService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces/table/table';
import { AddEditItemItemUnitComponent } from '../add-edit-item-item-unit/add-edit-item-item-unit.component';

@Component({
  selector: 'app-item-item-units',
  standalone: true,
  imports: [ RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
  templateUrl: './item-item-units.component.html',
  styleUrl: './item-item-units.component.scss'
})
export class ItemItemUnitsComponent extends BaseListComponent {
  @Input() itemId: string = '';
  isEnglish = false;
  tableOptions!: TableOptions;
  service = inject(ItemItemUnitsService);

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    this.initializeTableOptions();
    super.ngOnInit();
  }

  initializeTableOptions() {
    this.tableOptions = {
      inputUrl: {
        getAll: 'marinaorganization/getpaged',
        getAllMethod: 'POST',
        delete: 'marinaorganization/deletesoft'
      },
      inputCols: this.initializeTableColumns(),
      inputActions: this.initializeTableActions(),
      permissions: {
        componentName: 'SONO-TRACKER-Marina-ORGANIZATION',
        allowAll: true,
        listOfPermissions: []
      },
      bodyOptions: {
        filter: {
          "itemId": this.itemId
        }
      },
      responsiveDisplayedProperties: ['identity', 'idType', 'name', 'nationalityNameAr', 'job', 'mobile', 'email']
    };
  }

  initializeTableColumns(): TableOptions['inputCols'] {
    return [
      {
        field:  'organizationNameAr',
        header: 'الشركة الماكة',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'isActive',
        header: 'نشط',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'licenseNumber',
        header: 'رقم الترخيص',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'fromDate',
        header: 'من تاريخ',
        filter: true,
        filterMode: 'text'
      },
      {
        field: 'toDate',
        header: 'إلي تاريخ',
        filter: true,
        filterMode: 'text'
      },
      
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
    this.openDialog(AddEditItemItemUnitComponent, 'إضافة بيان ملكية', {
      pageType: 'add',
      row: { itemId: this.itemId }
    });
  }

  openEdit(rowData: any) {
    this.openDialog(AddEditItemItemUnitComponent, 'تعديل بيان ملكية', {
      pageType: 'edit',
      row: { rowData }
    });
  }

  /* when leaving the component */
  override ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
