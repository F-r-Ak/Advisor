import { Component, inject, OnInit } from '@angular/core';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { HttpService } from '../../../../../core';
import { TranslateModule } from '@ngx-translate/core';
import { takeUntil } from 'rxjs';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VendorService } from '../../../../../shared/services/settings/vendor/vendor.service';
import { AddEditVendorComponent } from '../../components/add-edit-vendor/add-edit-vendor.component';

@Component({
    selector: 'app-vendor',
    imports: [PrimeTitleToolBarComponent, PrimeDataTableComponent, TranslateModule, RouterModule],
    templateUrl: './vendor.component.html',
    styleUrl: './vendor.component.scss'
})
export class VendorComponent extends BaseListComponent implements OnInit {
    vendorService: VendorService = inject(VendorService);
    isEnglish = false;
    tableOptions!: TableOptions;

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override get service(): HttpService {
        // Return the unitsService as the HttpService implementation
        return this.vendorService;
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
                getAll: 'v1/itemvendor/getpaged',
                getAllMethod: 'POST',
                delete: 'v1/item/deletesoft'
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
                header: 'المسمى بالعربى',
                filter: true,
                filterMode: 'text'
            },
            {
                field: this.language === 'en' ? 'nameEn' : 'nameAr',
                header: 'المسمى بالانجليزى',
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
        this.openDialog(AddEditVendorComponent, this.localize.translate.instant('اضافة وحدة جديدة '), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditVendorComponent, this.localize.translate.instant('تعديل  وحدة'), {
            pageType: 'edit',
            row: { rowData }
        });
    }

    override ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
