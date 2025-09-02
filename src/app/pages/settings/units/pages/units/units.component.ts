import { Component, inject, OnInit } from '@angular/core';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { HttpService } from '../../../../../core';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { UnitsService } from '../../../../../shared/services/settings/units/units.service';
import { AddEditUnitComponent } from '../../components/add-edit-unit/add-edit-unit.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
    selector: 'app-units',
    imports: [PrimeTitleToolBarComponent, PrimeDataTableComponent, TranslateModule, RouterModule],
    templateUrl: './units.component.html',
    styleUrl: './units.component.scss'
})
export class UnitsComponent extends BaseListComponent implements OnInit {
    isEnglish = false;
    tableOptions!: TableOptions;
    service = inject(UnitsService);

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        this.localize.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
            this.language = lang;
            this.isEnglish = lang === 'en';
            this.initializeTableOptions();
        });
        super.ngOnInit();
    }

    initializeTableOptions() {
        this.tableOptions = {
            inputUrl: {
                getAll: 'v1/itemunit/getpaged',
                getAllMethod: 'POST',
                delete: 'v1/itemunit/deletesoft'
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
                header: 'مسمي الوحدة بالعربى',
                filter: true,
                filterMode: 'text'
            },
            {
                field: this.language === 'en' ? 'nameEn' : 'nameAr',
                header: 'مسمي الوحدة بالانجليزى',
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
        this.openDialog(AddEditUnitComponent, this.localize.translate.instant('اضافة وحدة'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditUnitComponent, this.localize.translate.instant('تعديل وحدة'), {
            pageType: 'edit',
            row: { rowData }
        });
    }

    override ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
