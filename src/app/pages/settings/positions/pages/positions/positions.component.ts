import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, PositionsService } from '../../../../../shared';
import { CardModule } from 'primeng/card';
import { takeUntil } from 'rxjs';
import { TableOptions } from '../../../../../shared/interfaces';
import { AddEditPositionComponent } from '../../components/add-edit-position/add-edit-position.component';

@Component({
    selector: 'app-positions',
    standalone: true,
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './positions.component.html',
    styleUrl: './positions.component.scss'
})
export class PositionsComponent extends BaseListComponent {
    @Input() employeeId: string = '';
    isEnglish = false;
    tableOptions!: TableOptions;
    service = inject(PositionsService);

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        this.localize.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
            this.language = lang;
            this.initializeTableOptions();
        });
        super.ngOnInit();
    }

    initializeTableOptions() {
        this.tableOptions = {
            inputUrl: {
                getAll: 'v1/position/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/position/deletesoft'
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
                field: 'code',
                header: 'الكود',
                filter: true,
                filterMode: 'text'
            },
            {
                field: this.language === 'ar' ? 'nameAr' : 'nameEn',
                header: 'المسمى الوظيفي',
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
        this.openDialog(AddEditPositionComponent, this.localize.translate.instant('اضافة مسمى وظيفي'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditPositionComponent, this.localize.translate.instant('تعديل مسمى وظيفي'), {
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
