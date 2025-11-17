import { Directive, Injectable, OnInit, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { catchError, debounceTime, distinctUntilChanged, of, Subject, takeUntil } from 'rxjs';
import { TableOptions } from '../../shared/interfaces';
import { DataTableService } from '../../shared';
import { BaseComponent } from './base-component';
import { HttpService } from '../../core/services/http/http.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Language } from '@ngx-translate/core';
import { Languages } from '../../core/enums/languages';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive()
@Injectable({
  providedIn: 'root'
})
export abstract class BaseListComponent extends BaseComponent implements OnInit {
  data = signal<any[]>([]);
  totalCount: WritableSignal<number> = signal(0);
  language = signal<Language>(Languages.AR);

  dialogRef: DynamicDialogRef | null = null;
  /* load data at first time */
  private firstInit: boolean = false;
  abstract tableOptions: WritableSignal<TableOptions>;
  abstract get service(): HttpService;

  dataTableService = inject(DataTableService);
  dialogService = inject(DialogService);

  // ✅ مراقبة عمليات البحث (بدل الاشتراك اليدوي)
  //   private searchEffec = effect(() => {
  //     const searchValue = this.dataTableService.searchNew$; // 👈 قراءة قيمة الـ signal
  //     if (searchValue === null) return; // أول مرة بيكون null فنتجاهله
  //     console.log('🔍 search effect running...', searchValue);
  //     this.firstInit ? this.loadDataFromServer() : (this.firstInit = true);
  //     console.log('this.firstInit :::', this.firstInit);
  //   });
  //     constructor(activatedRoute: ActivatedRoute) {
  //         super(activatedRoute);
  //     }

  constructor(activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  /**
     * Handle Data Table Event (Sort , Pagination , Filter , Delete , Print)
     * @param dataTableEvent
     *  معالجة أحداث الجدول (تحميل، تصفية، حذف... إلخ)

     */
  handleEvent(dataTableEvent: any): void {
    switch (dataTableEvent.eventType) {
      case 'lazyLoad':
        this.loadLazyLoadedData(dataTableEvent.data);
        break;
      case 'reset':
        this.resetOpt();
        break;
      case 'filter':
        this.applyFilter(dataTableEvent.value, dataTableEvent.column);
        break;
      case 'delete':
        this.deleteData(dataTableEvent.data);
        break;
      case 'deleteRange':
        this.deleteRange(dataTableEvent.data);
        break;
      case 'export':
        this.export(dataTableEvent.data.columnNames, dataTableEvent.data.reportName);
        break;
    }
  }

  // this to be moved inside data table input filters and emit filter event inside the filter method
  // columnSearchInput(): void {
  //     this.dataTableService.searchNew$.pipe(debounceTime(1000), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => {
  //         this.firstInit ? this.loadDataFromServer() : (this.firstInit = true);
  //     });
  // }

  applyFilter(value: any, column: string): void {
    this.resetOpt();
    this.dataTableService.opt.filter[column] = value.data;
    this.loadDataFromServer();
  }

  // search(filterArray: any): void {
  //     // debugger
  //     this.dataTableService.opt.filter = filterArray;
  //     this.loadDataFromServer(); // Reload data based on the filter
  // }

  openDialog(component: any, pageTitle: any, data: any, closable: boolean = true): void {
    // Add closable parameter with default value
    this.dialogRef = this.dialogService.open(component, {
      header: pageTitle,
      width: '65%',
      modal: true,
      breakpoints: {
        '1199px': '75vw',
        '575px': '90vw'
      },
      data: data,
      focusOnShow: false,
      autoZIndex: true,
      baseZIndex: 10000,
      dismissableMask: true,
      closable: closable // Set the closable property
    });
    this.dialogRef?.onDestroy.subscribe(() => {
      this.loadDataFromServer();
    });
  }

  /**
   * load data from server
   */
  loadDataFromServer(): void {
    this.dataTableService
      .loadData(this.tableOptions().inputUrl.getAll)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError(() => {
          this.alert.error(this.localize.translate.instant('VALIDATION.GET_ERROR'));
          return of({ data: [], totalCount: 0 });
        })
      )
      .subscribe({
        next: (res) => {
          this.data.set(res.data.data);
          this.totalCount.set(res.totalCount ?? 0);
        }
      });
  }
  /* lazy load table data */
  /* note:  gets called on entering component */
  loadLazyLoadedData(event?: LazyLoadEvent): void {
    this.resetOpt();
    this.setSortColumn(event);
    this.setPaging(event);
    this.loadDataFromServer();
  }

  /* set SortColumn */
  setSortColumn(event?: LazyLoadEvent | any): void {
    this.dataTableService.opt.orderByValue = [];
    this.dataTableService.opt.orderByValue.push({
      colId: event.sortField,
      sort: event.sortOrder === 1 ? 'asc' : 'desc'
    });
  }
  /* set paging parameters*/
  setPaging(event?: LazyLoadEvent | any): void {
    this.dataTableService.opt.pageSize = event.rows;
    this.dataTableService.opt.pageNumber = event.first / event.rows + 1;
  }

  // Filter
  filter(value?: any, column?: any, filterColumnName?: string, dataType?: string): void {
    this.resetOpt();
    value = this.checkDataType(value, dataType);
    if (filterColumnName) {
      this.dataTableService.opt.filter[filterColumnName] = value;
    } else {
      this.dataTableService.opt.filter[column] = value;
    }

    // 👇 هنا نحدث الإشارة (signal)
    this.dataTableService.searchNew$.set({
      keyword: value,
      page: this.dataTableService.opt.pageNumber
    });
  }

  checkDataType(value: any, dataType?: string): any {
    if (dataType === 'number') {
      value = +value;
    }
    return value;
  }

  deleteData(id: string) {
    this.dataTableService.delete(this.tableOptions().inputUrl.delete, id).subscribe({
      next: () => {
        (this.localize.translate.instant('VALIDATION.DELETE_SUCCESS'), this.loadDataFromServer()); // ✅ إعادة التحميل
      },
      error: () => this.localize.translate.instant('VALIDATION.GET_ERROR')
    });
  }

  /**
   * حذف مجموعة عناصر
   */
  deleteRange(ids: string[]) {
    this.dataTableService.deleteRange(this.tableOptions().inputUrl.delete, ids).subscribe({
      next: (res) => {
        // this.data.set(res.data)
        // this.totalCount.set(res.totalCount)
        this.alert.success(this.localize.translate.instant('VALIDATION.DELETE_SUCCESS'));
        this.loadDataFromServer();
      },
      error: () => {
        this.alert.error(this.localize.translate.instant('VALIDATION.GET_ERROR'));
      }
    });
  }

  /**
   * reset server options
   * إعادة ضبط خيارات الجدول
   */
  resetOpt(): void {
    this.dataTableService.opt = {
      pageNumber: 1,
      pageSize: 5,
      orderByValue: [{ colId: 'id', sort: 'asc' }],
      filter: {}
    };

    this.dataTableService.opt.filter = this.tableOptions().bodyOptions.filter ?? this.dataTableService.opt.filter;
    this.dataTableService.opt.filter.appId = this.tableOptions().appId !== 0 ? this.tableOptions().appId : 0;
  }

  export(sheetDetails: { [k: string]: string }, fileName: string) {
    const sheetColumnsValues = Object.keys(sheetDetails);

    const newArray = this.data()?.map((eachData, index) => {
      let eachRow = {};

      sheetColumnsValues.forEach((col) => {
        eachRow = {
          ...eachRow,
          '#': index + 1,
          [sheetDetails[col]]: eachData[col]
        };
      });

      return eachRow;
    });

    this.excel.exportAsExcelFile(newArray, fileName);
  }

  /**
   * computed signal لاستخدامها في القالب لو حبيت
   */
  filteredData = computed(() => {
    return this.data().filter((x) => !!x);
  });

  /* when leaving the component */
  override ngOnDestroy(): void {
    console.log('ngOnDestroy');
    this.dataTableService.searchNew$.set(null);
    super.ngOnDestroy();
  }

  Redirect(): void {
    const currentRoute = this.router.url;
    const index = currentRoute.lastIndexOf('/');
    const str = currentRoute.substring(0, index);
    this.router.navigate([str]);
  }
}
