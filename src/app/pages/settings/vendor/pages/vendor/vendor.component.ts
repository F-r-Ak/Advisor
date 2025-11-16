import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, VendorService } from '../../../../../shared';
import { CardModule } from 'primeng/card';
import { TableOptions } from '../../../../../shared/interfaces';
import { AddEditVendorComponent } from '../../components/add-edit-vendor/add-edit-vendor.component';

@Component({
    selector: 'app-vendor',
    standalone: true,
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './vendor.component.html',
    styleUrl: './vendor.component.scss'
})
export class VendorComponent extends BaseListComponent {
    @Input() employeeId: string = '';
    isEnglish = false;
    tableOptions!: WritableSignal<TableOptions>;
    service = inject(VendorService);

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        effect(() => {
            const lang = this.localize.currentLanguage(); // <-- Signal usage

            this.language.set(lang);
            this.initializeTableOptions();
        });
        super.ngOnInit();
    }

    initializeTableOptions() {
        this.tableOptions = signal({
            inputUrl: {
                getAll: 'v1/itemvendor/getpaged',
                getAllMethod: 'POST',
                delete: 'v1/itemvendor/delete'
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
        });
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
                field: this.language() === 'ar' ? 'nameAr' : 'nameEn',
                header: 'مسمي الشركة المصنعة',
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
        this.openDialog(AddEditVendorComponent, this.localize.translate.instant('اضافة شركة مصنعة'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditVendorComponent, this.localize.translate.instant('تعديل شركة مصنعة'), {
            pageType: 'edit',
            row: { rowData }
        });
    }
}
