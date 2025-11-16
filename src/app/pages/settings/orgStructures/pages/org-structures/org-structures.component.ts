import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { OrgStructuresService } from '../../../../../shared/services/settings/orgStructures/org-structures.service';
import { AddEditOrgStructuresComponent } from '../../components/add-edit-org-structures/add-edit-org-structures.component';

@Component({
    selector: 'app-org-structures',
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './org-structures.component.html',
    styleUrl: './org-structures.component.scss'
})
export class OrgStructuresComponent extends BaseListComponent {
    isEnglish = false;
    tableOptions!: WritableSignal<TableOptions>;
    service = inject(OrgStructuresService);

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
                getAll: 'v1/orgstructures/getpaged',
                getAllMethod: 'POST',
                delete: 'v1/orgstructures/delete'
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
            responsiveDisplayedProperties: ['name']
        });
    }

    initializeTableColumns(): TableOptions['inputCols'] {
        return [
            // {
            //     field: 'code',
            //     header: 'الكود',
            //     filter: true,
            //     filterMode: 'text'
            // },
            {
                field: this.language() === 'ar' ? 'name' : 'name',
                header: 'اسم هيكل المؤسسة',
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
        this.openDialog(AddEditOrgStructuresComponent, this.localize.translate.instant('اضافة هيكل تنظيمي مؤسسة'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditOrgStructuresComponent, this.localize.translate.instant('تعديل هيكل تنظيمي مؤسسة'), {
            pageType: 'edit',
            row: { rowData }
        });
    }

}
