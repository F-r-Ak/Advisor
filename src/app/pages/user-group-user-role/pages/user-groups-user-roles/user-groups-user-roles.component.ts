import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { takeUntil } from 'rxjs';
import { UserUserGroupService } from '../../../../shared/services/pages/user-user-group/user-user-group.service';
import { AddEditUserGroupUserRoleComponent } from '../../components/user-group-user-role/add-edit-user-group-user-role.component';

@Component({
    selector: 'app-user-groups-user-roles',
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './user-groups-user-roles.component.html',
    styleUrl: './user-groups-user-roles.component.scss'
})
export class UserGroupUserRoleComponent extends BaseListComponent {
    isEnglish = false;
    tableOptions!: WritableSignal<TableOptions>;
    service = inject(UserUserGroupService);

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
                getAll: 'v1/usergroupuserrole/getpaged',
                getAllMethod: 'POST',
                delete: 'v1/usergroupuserrole/deletesoft'
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
            responsiveDisplayedProperties: ['userGroup', 'userRole']
        });
    }

    initializeTableColumns(): TableOptions['inputCols'] {
        return [
            {
                field: 'userGroup',
                header: 'الدور',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'userRole',
                header: 'الصلاحيات',
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
        this.openDialog(AddEditUserGroupUserRoleComponent, this.localize.translate.instant('اضافة صلاحيات الادوار'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditUserGroupUserRoleComponent, this.localize.translate.instant('تعديل صلاحيات الادوار'), {
            pageType: 'edit',
            row: { rowData }
        });
    }
}
