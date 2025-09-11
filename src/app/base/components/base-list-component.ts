import { Directive, Injectable, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { TableOptions } from '../../shared/interfaces';
import { DataTableService } from '../../shared';
import { BaseComponent } from './base-component';
import { HttpService } from '../../core/services/http/http.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Directive()
@Injectable({
    providedIn: 'root'
})
export abstract class BaseListComponent extends BaseComponent implements OnInit {
    data!: any[];
    totalCount: number = 0;
    language: string = 'ar';
    dialogRef: DynamicDialogRef | undefined;
    /* load data at first time */
    private firstInit!: boolean;
    abstract tableOptions: TableOptions;
    abstract get service(): HttpService;
    protected destroy$: Subject<boolean> = new Subject<boolean>();
    dataTableService = inject(DataTableService);
    dialogService = inject(DialogService);
    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    /**
     * Handle Data Table Event (Sort , Pagination , Filter , Delete , Print)
     * @param dataTableEvent
     */
    handleEvent(dataTableEvent: any): void {
        if (dataTableEvent.eventType == 'lazyLoad') {
            this.loadLazyLoadedData(dataTableEvent.data);
        }
        if (dataTableEvent.eventType == 'reset') {
            this.resetOpt();
        }

        // if (dataTableEvent.eventType == 'filter') {
        //   console.log('dataTableEvent at filter:', dataTableEvent);
        //   this.filter(dataTableEvent.value, dataTableEvent.column,dataTableEvent.filterColumnName,dataTableEvent.dataType)
        // }

        if (dataTableEvent.eventType === 'filter') {
            this.applyFilter(dataTableEvent.value, dataTableEvent.column);
        }

        if (dataTableEvent.eventType == 'delete') {
            this.deleteData(dataTableEvent.data);
        }
        if (dataTableEvent.eventType == 'deleteRange') {
            this.deleteRange(dataTableEvent.data);
            this.loadDataFromServer();
        }
        if (dataTableEvent.eventType == 'export') {
            this.export(dataTableEvent.data.columnNames, dataTableEvent.data.reportName);
        }
    }
    // this to be moved inside data table input filters and emit filter event inside the filter method
    columnSearchInput(): void {
        this.dataTableService.searchNew$.pipe(debounceTime(1000), distinctUntilChanged(), takeUntil(this.destroy$)).subscribe(() => {
            this.firstInit ? this.loadDataFromServer() : (this.firstInit = true);
        });
    }

    applyFilter(value: any, column: string): void {
        this.resetOpt();
        this.dataTableService.opt.filter[column] = value.data;
        this.loadDataFromServer();
    }

    search(filterArray: any): void {
        // debugger
        this.dataTableService.opt.filter = filterArray;
        this.loadDataFromServer(); // Reload data based on the filter
    }

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
        this.dialogRef.onDestroy.subscribe(() => {
            this.loadDataFromServer();
        });
    }

    // load data from server
    loadDataFromServer(): void {
        this.dataTableService.loadData(this.tableOptions.inputUrl.getAll).subscribe({
            next: (res) => {
                this.data = res.data.data;
                this.totalCount = res.data.totalCount;
                console.log('res ::', res);
            },
            error: (err) => {
                this.alert.error(this.localize.translate.instant('VALIDATION.GET_ERROR'));
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
        if (filterColumnName !== undefined && filterColumnName !== '' && filterColumnName !== null) {
            this.dataTableService.searchNew$.next((this.dataTableService.opt.filter[filterColumnName] = value));
        } else {
            this.dataTableService.searchNew$.next((this.dataTableService.opt.filter[column] = value));
        }
    }

    checkDataType(value: any, dataType?: string): any {
        if (dataType === 'number') {
            value = +value;
        }
        return value;
    }

    deleteData(id: string) {
        this.dataTableService.delete(this.tableOptions.inputUrl.delete, id).subscribe((res: any) => {
            this.data = res.data;
            this.totalCount = res.totalCount;
            this.loadDataFromServer();
        });
    }

    deleteRange(id: string[]) {
        this.dataTableService.deleteRange(this.tableOptions.inputUrl.delete, id).subscribe({
            next: (res) => {
                this.alert.success(this.localize.translate.instant('VALIDATION.DELETE_SUCCESS'));
                this.data = res.data.data;
                this.totalCount = res.data.totalCount;
                this.loadDataFromServer();
            },
            error: (err) => {
                this.alert.error(this.localize.translate.instant('VALIDATION.GET_ERROR'));
            }
        });
    }

    /* reset server options */
    resetOpt(): void {
        this.dataTableService.opt = {
            pageNumber: 1,
            pageSize: 5,
            orderByValue: [{ colId: 'id', sort: 'asc' }],
            filter: {}
        };
        this.dataTableService.opt.filter = this.tableOptions.bodyOptions.filter !== null && this.tableOptions.bodyOptions.filter !== undefined ? this.tableOptions.bodyOptions.filter : this.dataTableService.opt.filter;
        this.dataTableService.opt.filter.appId = this.tableOptions.appId !== 0 ? this.tableOptions.appId : 0;
    }

    export(sheetDetails: { [k: string]: string }, fileName: string) {
        const sheetColumnsValues = Object.keys(sheetDetails);

        const newArray = this.data.map((eachData, index) => {
            let eachRow = {};

            sheetColumnsValues.map((eachColumnValue) => {
                eachRow = {
                    ...eachRow,
                    ...{ '#': index + 1 },
                    [sheetDetails[eachColumnValue]]: eachData[eachColumnValue]
                };
            });

            return eachRow;
        });

        this.excel.exportAsExcelFile(newArray, fileName);
    }

    /* when leaving the component */
    ngOnDestroy() {
        this.dataTableService.searchNew$.next({});
        this.dataTableService.searchNew$.unsubscribe();
    }
    Redirect() {
        const currentRoute = this.route.url;
        const index = currentRoute.lastIndexOf('/');
        const str = currentRoute.substring(0, index);
        this.route.navigate([str]);
    }
}
