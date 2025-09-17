import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { RegionsService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { takeUntil } from 'rxjs';
import { AddEditRegionsComponent } from '../../components/add-edit-regions/add-edit-regions.component';

@Component({
    selector: 'app-item-regions',
    standalone: true,
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './regions.component.html',
    styleUrl: './regions.component.scss'
})
export class RegionsComponent extends BaseListComponent {
    @Input() employeeId: string = '';
    isEnglish = false;
    tableOptions!: TableOptions;
    service = inject(RegionsService);

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
                getAll: 'v1/regions/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/regions/delete'
            },
            inputCols: this.initializeTableColumns(),
            inputActions: this.initializeTableActions(),
            permissions: {
                componentName: 'ADVISOR-SYSTEM-REGIONS',
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
                header: 'مسمي المنطقة',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'cityName',
                header: 'اسم المدينة',
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
        this.openDialog(AddEditRegionsComponent, this.localize.translate.instant('اضافة مسمي المنطقة'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditRegionsComponent, this.localize.translate.instant('تعديل مسمي المنطقة'), {
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
