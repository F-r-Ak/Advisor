import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { AddEditUserBranchComponent } from '../../components/add-edit-user-branch/add-edit-user-branch.component';
import { UserBranchService } from '../../../../shared/services/pages/user-branch/user-branch.service';

@Component({
    selector: 'app-user-branch',
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './user-branch.component.html',
    styleUrl: './user-branch.component.scss'
})
export class UserBranchComponent extends BaseListComponent {
    isEnglish = false;
    tableOptions!: WritableSignal<TableOptions>;
    service = inject(UserBranchService);

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
                getAll: 'v1/userbranch/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/userbranch/deletesoft'
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
            responsiveDisplayedProperties: ['usernameAr', 'branchNameAr']
        });
    }

    initializeTableColumns(): TableOptions['inputCols'] {
        return [
            {
                field: 'usernameAr',
                header: 'اسم المستخدم',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'branchNameAr',
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
        this.openDialog(AddEditUserBranchComponent, this.localize.translate.instant('اضافة فرع المستخدم'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditUserBranchComponent, this.localize.translate.instant('تعديل بيانات فرع المستخدم'), {
            pageType: 'edit',
            row: { rowData }
        });
        console.log('rowData Before Edit User Branch Component : ', rowData);
    }
}
