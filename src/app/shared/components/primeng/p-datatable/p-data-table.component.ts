import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { ExportExcelService } from '../../../services/export-excel/export-excel.service';
import { takeUntil } from 'rxjs';
import { TableOptions } from '../../../interfaces';
import { TableModule } from 'primeng/table';
import { DatePipe, NgClass } from '@angular/common';
import { PrimeDeleteDialogComponent } from '../p-delete-dialog/p-delete-dialog.component';
@Component({
  selector: 'app-prime-data-table',
  imports: [TableModule, NgClass, RouterModule, PrimeDeleteDialogComponent, DatePipe],
  templateUrl: './p-data-table.component.html',
  styleUrls: ['./p-data-table.component.scss']
})
export class PrimeDataTableComponent implements OnInit, OnDestroy {
  // Inputs
  @Input() tableOptions!: TableOptions;
  @Input() totalCount: number = 0;
  @Input() pageSize: number = 0;
  @Input() checkbox: boolean = false;
  @Input() set data(value) {
    this._data.next(value);
  }

  get data() {
    return this._data.getValue();
  }
  finalData: any[] = [];
  permissions: any = {};
  Showing: string = 'Showing';
  language!: string;
  deleteDialog: boolean = false;
  rowId!: string;
  rowRoute!: string;
  selected: any = '';
  // Output

  @Output() event: EventEmitter<any> = new EventEmitter<any>();

  /* hold the current route */
  currentRoute;
  private _data = new BehaviorSubject<any[]>([]);
  /* subscriber to unsubscribe when leaving the component */
  private destroy$: Subject<boolean> = new Subject<boolean>();
  // services
  router = inject(Router);
  excel = inject(ExportExcelService);
  constructor() {
    this.currentRoute = this.router.url.substring(0, this.router.url.length - 3);
  }

  ngOnInit(): void {
    this.permissions = this.tableOptions.permissions;
    this._data.subscribe(x => {
      this.finalData = this.data;
      console.log('data at datatable at ngOnInit', this.finalData);
    });
  }

  loadLazyLoadedData($event: any): void {
    this.event.emit({ data: $event, eventType: 'lazyLoad' });
  }

  getCellData(row: any, col: any): any {
    const nestedProperties: string[] = col.field.split('.');
    let value: any = row;
    for (const prop of nestedProperties) {
      if (value[prop] == null) {
        return '';
      }
      value = value[prop];
    }
    return value;
  }

  filter(value: string | any, column: string): void {
    console.log('value: ', value + ' column: ', column);
    this.event.emit({ eventType: 'filter', value, column });
  }

  delete(id: any): void {
    this.deleteDialog = true;
    this.rowId = id;
    console.log('rowId: ', this.rowId);
  }

  modalClosed(isClosed: boolean) {
    if (isClosed) {
      if (this.selected && this.selected.length > 0) {
        const idsToDelete = this.selected.map((item: any) => item.id); // Collect IDs of selected items
        this.deleteData(idsToDelete); // Call method to delete selected items
      } else {
        this.event.emit({ data: this.rowId, eventType: 'delete' });
      }
    }
    this.deleteDialog = false;
  }

  deleteSelected() {
    this.deleteDialog = true;
  }

  deleteData(ids: string[]) {
    this.event.emit({ data: ids, eventType: 'deleteRange' });
    console.log('IDs to be deleted:', ids);
  }

  export(columnNames: any, reportName: any): void {
    this.event.emit({ data: columnNames, reportName, eventType: 'export' });
  }

  handleLinkClick(row: any, col: any) {
    console.log('test click: ', row, 'col: ', col);
    console.log('permission: ', this.permissions);
    if (this.permissions.listOfPermissions.indexOf('Permission.' + this.permissions.componentName + '.Edit') > -1) {
      // Navigate to the edit page
      this.router.navigate([col.route + row.id]);
    } else if (this.permissions.listOfPermissions.indexOf('Permission.' + this.permissions.componentName + '.View') > -1) {
      // Navigate to the view page
      this.router.navigate([col.viewRoute + row.id]);
    }
  }

  /* when leaving the component */
  ngOnDestroy() {
    this.event.emit({ eventType: 'reset' });
    this._data.unsubscribe();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
