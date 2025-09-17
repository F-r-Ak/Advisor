import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ShiftsService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { takeUntil } from 'rxjs';
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
    tableOptions!: TableOptions;
    service = inject(ShiftsService);

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        this.localize.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
            this.language = lang;
            this.initializeTableOptions();
        });
    }

    initializeTableOptions() {
        this.tableOptions = {
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
            responsiveDisplayedProperties: ['code', 'nameAr', 'nameEn']
        };
    }

    initializeTableColumns(): TableOptions['inputCols'] {
        return [
            {
                field: this.language === 'ar' ? 'UserNameAr' : 'UserNameEn',
                header: 'اسم المستخدم',
                filter: true,
                filterMode: 'text'
            },
            {
                field: this.language === 'ar' ? 'branchNameAr' : 'branchNameEn',
                header: 'اسم الفرع',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'startTime',
                header: 'وقت بداية الشيفت',
                filter: true,
                filterMode: 'text'
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

    /* when leaving the component */
    override ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
