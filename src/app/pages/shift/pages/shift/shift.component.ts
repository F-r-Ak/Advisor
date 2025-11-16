import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ShiftsService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditShiftComponent } from '../../components/add-edit-shift/add-edit-shift.component';

@Component({
    selector: 'app-shift',
    standalone: true,
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './shift.component.html',
    styleUrl: './shift.component.scss'
})
export class ShiftsComponent extends BaseListComponent {
    @Input() employeeId: string = '';
    isEnglish = false;
    tableOptions!: WritableSignal<TableOptions>;
    service = inject(ShiftsService);

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        effect(() => {
            const lang = this.localize.currentLanguage(); // <-- Signal usage

            this.language.set(lang);
            this.initializeTableOptions();
        });
    }

    initializeTableOptions() {
        this.tableOptions = signal({
            inputUrl: {
                getAll: 'v1/shift/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/shift/deletesoft'
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
            responsiveDisplayedProperties: ['user', 'branch', 'startTime', 'endTime', 'startValue', 'endValue', 'notes']
        });
    }

    initializeTableColumns(): TableOptions['inputCols'] {
        return [
            {
                field: 'user',
                header: 'اسم المستخدم',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'branch',
                header: 'اسم الفرع',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'startTime',
                header: 'وقت بداية الشيفت',
                filter: true,
                filterMode: 'dateTime'
            },
            {
                field: 'endTime',
                header: 'وقت نهاية الشيفت',
                filter: true,
                filterMode: 'dateTime'
            },
            {
                field: 'startValue',
                header: 'قيمة بداية الشيفت',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'endValue',
                header: 'قيمة نهاية الشيفت',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'notes',
                header: 'ملاحظات',
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
        this.openDialog(AddEditShiftComponent, this.localize.translate.instant('اضافة شيفت'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditShiftComponent, this.localize.translate.instant('تعديل شيفت'), {
            pageType: 'edit',
            row: { rowData }
        });
    }
}
