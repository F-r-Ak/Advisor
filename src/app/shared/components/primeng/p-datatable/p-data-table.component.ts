import { Component, Input, Output, EventEmitter, inject, signal, WritableSignal, effect, OnDestroy, computed, model } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ExportExcelService } from '../../../services/export-excel/export-excel.service';
import { TableOptions } from '../../../interfaces';
// PrimeNG imports
import { TableModule } from 'primeng/table';
import { DatePipe, NgClass } from '@angular/common';
import { PrimeDeleteDialogComponent } from '../p-delete-dialog/p-delete-dialog.component';
import { ButtonModule } from 'primeng/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-prime-data-table',
  standalone: true,
  imports: [TableModule, NgClass, RouterModule, PrimeDeleteDialogComponent, DatePipe, ButtonModule, TranslatePipe],
  templateUrl: './p-data-table.component.html',
  styleUrls: ['./p-data-table.component.scss']
})
export class PrimeDataTableComponent implements OnDestroy {
  // 🧩 Inputs
  @Input({ required: true }) tableOptions!: WritableSignal<TableOptions>;
  totalCount = model(0);
  pageSize = model(0);
  inputColsLenght = computed(() => (this.tableOptions().inputCols?.length ?? 0) + 1);

  @Input() checkbox = false;

  // 🧩 Inputs مع setters
  // @Input() set totalCount(value: number) {
  //   this.totalCountSignal.set(value ?? 0);
  // }

  // @Input() set pageSize(value: number) {
  //   this.pageSizeSignal.set(value ?? 0);
  // }

  // totalEffect = effect(() => {
  //   console.log('📊 totalCount changed to:', this.totalCountSignal());
  //   console.log('📏 pageSize changed to:', this.pageSizeSignal());
  // });
  // 🧠 Reactive data using signals
  private _data: WritableSignal<any[]> = signal([]);
  finalData: WritableSignal<any[]> = signal([]);
  permissions: WritableSignal<any> = signal({});

  // 🗣️ Output Events
  @Output() event = new EventEmitter<any>();

  // 🧭 Routing + Services
  router = inject(Router);
  excel = inject(ExportExcelService);

  // 🧹 Cleanup subjects (للفلاتر)
  private destroy$ = new Subject<void>();
  private filterSubjects: Record<string, Subject<string>> = {};

  // 🌐 Helpers
  Showing = 'Showing';
  language!: string;
  deleteDialog = false;
  rowId!: string;
  rowRoute!: string;
  selected: any = '';
  currentRoute: string;

  constructor() {
    this.currentRoute = this.router.url.substring(0, this.router.url.length - 3);
  }

  /** Setter & Getter for input data */
  @Input() set data(value: any[]) {
    this._data.set(value ?? []);
  }
  get data() {
    return this._data();
  }

  // ⚡️ Effect: Watch for data changes
  dataEffect = effect(() => {
    const res = this._data();
    if (!res || res.length === 0) {
      console.log('⚠️ No data available.');
      this.finalData.set([]);
      return;
    }
    this.finalData.set(res);
    console.log('✅ Data updated:', this.finalData());
  });

  // ⚡️ Effect: Watch for permissions changes
  permissionsEffect = effect(() => {
    const opts = this.tableOptions;
    if (opts()?.permissions) {
      this.permissions.set(opts().permissions);
      // console.log('🔐 Permissions updated:', this.permissions());
    }
  });

  // 🔁 Lazy loading event
  loadLazyLoadedData($event: any): void {
    this.event.emit({ data: $event, eventType: 'lazyLoad' });
  }

  // 🧩 Nested property getter
  getCellData(row: any, col: any): any {
    const nestedProps = col.field.split('.');
    let value = row;
    for (const prop of nestedProps) {
      if (value[prop] == null) return '';
      value = value[prop];
    }
    return value;
  }

  // 🔍 Filtering logic (debounced)
  filter(event: any, column: string): void {
    const inputValue = event.target.value;

    if (!this.filterSubjects[column]) {
      this.filterSubjects[column] = new Subject<string>();
      this.filterSubjects[column].pipe(debounceTime(500), takeUntil(this.destroy$)).subscribe((debouncedValue) => {
        this.event.emit({
          eventType: 'filter',
          value: { data: debouncedValue },
          column
        });
      });
    }

    this.filterSubjects[column].next(inputValue);

    console.log('inputValue :::', inputValue);
    console.log('column :::', column);
    console.log('this.filterSubjects[column] :::', this.filterSubjects[column]);
  }

  // 🗑️ Deletion logic
  delete(id: any): void {
    this.deleteDialog = true;
    this.rowId = id;
    console.log('🗑️ Selected row ID:', this.rowId);
  }

  modalClosed(isClosed: boolean) {
    if (isClosed) {
      if (this.selected && this.selected.length > 0) {
        const idsToDelete = this.selected.map((item: any) => item.id);
        this.deleteData(idsToDelete);
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
    console.log('🗑️ IDs to be deleted:', ids);
  }

  // 📤 Export
  export(columnNames: any, reportName: any): void {
    this.event.emit({ data: columnNames, reportName, eventType: 'export' });
  }

  // 🔗 Handle click navigation
  handleLinkClick(row: any, col: any) {
    console.log('🖱️ Link clicked:', row, col);
    const perms = this.permissions();

    if (perms.listOfPermissions?.includes(`Permission.${perms.componentName}.Edit`)) {
      this.router.navigate([col.route + row.id]);
    } else if (perms.listOfPermissions?.includes(`Permission.${perms.componentName}.View`)) {
      this.router.navigate([col.viewRoute + row.id]);
    }
  }

  // 🧹 Cleanup on destroy
  ngOnDestroy() {
    this.event.emit({ eventType: 'reset' });
    Object.values(this.filterSubjects).forEach((subject) => subject.complete());
    this.destroy$.next();
    this.destroy$.complete();
    // console.log('🧹 PrimeDataTableComponent destroyed — reset event emitted');
  }
}
