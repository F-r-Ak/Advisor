import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ClientCategoryService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { AddEditClientCategoryComponent } from '../../components/add-edit-client-category/add-edit-client-category.component';

@Component({
    selector: 'app-client-category',
    standalone: true,
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './client-category.component.html',
    styleUrl: './client-category.component.scss'
})
export class ItemPricingComponent extends BaseListComponent {
    @Input() employeeId: string = '';
    isEnglish = false;
    tableOptions!: WritableSignal<TableOptions>;
    service = inject(ClientCategoryService);

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
                getAll: 'v1/clientcategory/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/clientcategory/deletesoft'
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
                header: 'مسمي تصنيف العميل',
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
        this.openDialog(AddEditClientCategoryComponent, this.localize.translate.instant('اضافة تصنيف عميل'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditClientCategoryComponent, this.localize.translate.instant('تعديل تصنيف عميل'), {
            pageType: 'edit',
            row: { rowData }
        });
    }
}
