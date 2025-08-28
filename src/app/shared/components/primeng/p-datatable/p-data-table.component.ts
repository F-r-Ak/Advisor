import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { debounceTime, takeUntil, BehaviorSubject, Subject } from 'rxjs';
import { ExportExcelService } from '../../../services';
import { TableOptions } from '../../../interfaces';
import { TranslationService } from '../../../services';
import { TableModule } from 'primeng/table';
import { DatePipe, NgClass } from '@angular/common';
import { PrimeDeleteDialogComponent } from '../p-delete-dialog/p-delete-dialog.component';

@Component({
    selector: 'app-prime-data-table',
    standalone: true,
    imports: [TranslateModule, TableModule, NgClass, RouterModule, PrimeDeleteDialogComponent, DatePipe],
    templateUrl: './p-data-table.component.html',
    styleUrls: ['./p-data-table.component.scss']
})
export class PrimeDataTableComponent implements OnInit, OnDestroy {
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

    @Output() event: EventEmitter<any> = new EventEmitter<any>();

    finalData: any[] = [];
    permissions: any = {};
    language!: string;
    deleteDialog: boolean = false;
    rowId!: string;
    selected: any = '';

    private _data = new BehaviorSubject<any[]>([]);
    private destroy$: Subject<boolean> = new Subject<boolean>();
    private filterSubjects: { [key: string]: Subject<string> } = {};

    localize = inject(TranslationService);
    router = inject(Router);
    excel = inject(ExportExcelService);
    currentRoute = this.router.url.substring(0, this.router.url.length - 3);

    ngOnInit(): void {
        this.permissions = this.tableOptions.permissions;

        this._data.subscribe((x) => {
            this.finalData = this.data;
        });

        this.localize.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe((lang: any) => (this.language = lang));
    }

    loadLazyLoadedData($event: any): void {
        this.event.emit({ data: $event, eventType: 'lazyLoad' });
    }

    getCellData(row: any, col: any): any {
        const nestedProperties: string[] = col.field.split('.');
        let value: any = row;
        for (const prop of nestedProperties) {
            if (value[prop] == null) return '';
            value = value[prop];
        }
        return value;
    }

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
    }

    delete(id: any): void {
        this.deleteDialog = true;
        this.rowId = id;
    }

    deleteSelected() {
        this.deleteDialog = true;
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

    deleteData(ids: string[]) {
        this.event.emit({ data: ids, eventType: 'deleteRange' });
    }

    export(columnNames: any, reportName: any): void {
        this.event.emit({ data: columnNames, reportName, eventType: 'export' });
    }

    handleLinkClick(row: any, col: any) {
        if (this.permissions.listOfPermissions.indexOf('Permission.' + this.permissions.componentName + '.Edit') > -1) {
            this.router.navigate([col.route + row.id]);
        } else if (this.permissions.listOfPermissions.indexOf('Permission.' + this.permissions.componentName + '.View') > -1) {
            this.router.navigate([col.viewRoute + row.id]);
        }
    }

    ngOnDestroy() {
        this.event.emit({ eventType: 'reset' });
        this._data.unsubscribe();
        this.destroy$.next(true);
        this.destroy$.unsubscribe();

        Object.values(this.filterSubjects).forEach((subject) => subject.complete());
    }
}
