import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { UserUserGroupService } from '../../../../shared/services/pages/user-user-group/user-user-group.service';
import { AddEditUserUserGroupComponent } from '../../components/add-edit-user-user-group/add-edit-user-user-group.component';

@Component({
    selector: 'app-user-user-group',
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './user-user-group.component.html',
    styleUrl: './user-user-group.component.scss'
})
export class UserUserGroupComponent extends BaseListComponent {
    isEnglish = false;
    service = inject(UserUserGroupService);

    // ✅ Signal initialized at class level with static configuration
    tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({
        inputUrl: {
            getAll: 'v1/userusergroup/getpaged',
            getAllMethod: 'POST',
            delete: 'v1/userusergroup/deletesoft'
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
        responsiveDisplayedProperties: ['user', 'userGroup']
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
                field: 'user',
                header: 'اسم المستخدم',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'userGroup',
                header: 'الادوار',
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
        this.openDialog(AddEditUserUserGroupComponent, this.localize.translate.instant('اضافة دور مستخدم'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditUserUserGroupComponent, this.localize.translate.instant('تعديل دور مستخدم'), {
            pageType: 'edit',
            row: { rowData }
        });
    }
}
