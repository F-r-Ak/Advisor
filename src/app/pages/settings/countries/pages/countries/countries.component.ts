import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { CountriesService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { AddEditCountriesComponent } from '../../components/add-edit-countries/add-edit-countries.component';

@Component({
    selector: 'app-countries',
    standalone: true,
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './countries.component.html',
    styleUrl: './countries.component.scss'
})
export class CountriesComponent extends BaseListComponent {
    @Input() employeeId: string = '';
    isEnglish = false;
    tableOptions!: WritableSignal<TableOptions>;
    service = inject(CountriesService);

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
                getAll: 'v1/countries/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/countries/deletesoft'
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
                header: 'مسمي الفرع',
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
        this.openDialog(AddEditCountriesComponent, this.localize.translate.instant('اضافة دولة'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditCountriesComponent, this.localize.translate.instant('تعديل دولة'), {
            pageType: 'edit',
            row: { rowData }
        });
    }
}
