import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, SellersService } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditSellersComponent } from '../../components/add-edit-sellers/add-edit-sellers.component';

@Component({
    selector: 'app-sellers',
    standalone: true,
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './sellers.component.html',
    styleUrl: './sellers.component.scss'
})
export class ClientsComponent extends BaseListComponent {
    @Input() employeeId: string = '';
    isEnglish = false;
    tableOptions!: WritableSignal<TableOptions>;
    service = inject(SellersService);

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
                getAll: 'v1/seller/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/seller/deletesoft'
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
            responsiveDisplayedProperties: ['code', 'nameAr', 'nameEn', 'phone', 'address', 'email', 'sellerCategory', 'region', 'openingBalance', 'paymentTerms.nameAr']
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
                header: 'اسم المورد',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'phone',
                header: 'رقم الهاتف',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'address',
                header: 'العنوان',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'email',
                header: 'البريد الالكتروني',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'sellerCategory',
                header: 'تصنيف المورد',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'region',
                header: 'المنطقة',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'openingBalance',
                header: 'الرصيد الأفتتاحي',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'paymentTerms.nameAr',
                header: 'شروط الدفع',
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
        this.openDialog(AddEditSellersComponent, this.localize.translate.instant('اضافة مورد'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditSellersComponent, this.localize.translate.instant('تعديل بيانات مورد'), {
            pageType: 'edit',
            row: { rowData }
        });
    }
}
