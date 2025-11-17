import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { ItemPricingService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { AddEditItemPricingComponent } from '../../components/add-edit-item-pricing/add-edit-item-pricing.component';

@Component({
    selector: 'app-item-pricing',
    standalone: true,
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './item-pricing.component.html',
    styleUrl: './item-pricing.component.scss'
})
export class ItemPricingComponent extends BaseListComponent {
    @Input() employeeId: string = '';
    isEnglish = false;
    service = inject(ItemPricingService);

    // ✅ Signal initialized at class level with static configuration
    tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({
        inputUrl: {
            getAll: 'v1/itempricing/getPaged',
            getAllMethod: 'POST',
            delete: 'v1/itempricing/deletesoft'
        },
        inputCols: [],
        inputActions: [],
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

    // ✅ Effect at class level (not in ngOnInit)
    langEffect = effect(() => {
        const lang = this.localize.currentLanguage();
        this.language.set(lang);

        // Update only dynamic parts using .update()
        this.tableOptions.update(options => ({
            ...options,
            inputCols: this.initializeTableColumns(),
            inputActions: this.initializeTableActions()
        }));
    });

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
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
                header: 'مسمي تسعير البيع',
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
        this.openDialog(AddEditItemPricingComponent, this.localize.translate.instant('اضافة تسعير البيع'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditItemPricingComponent, this.localize.translate.instant('تعديل تسعير البيع'), {
            pageType: 'edit',
            row: { rowData }
        });
    }
}
