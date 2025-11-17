import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { UserRoleService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../../shared';
import { TableOptions } from '../../../../../shared/interfaces';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { AddEditUserRoleComponent } from '../../components/add-edit-user-role/add-edit-user-role.component';

@Component({
    selector: 'app-treasury',
    standalone: true,
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './user-role.component.html',
    styleUrl: './user-role.component.scss'
})
export class UserRoleComponent extends BaseListComponent {
    @Input() employeeId: string = '';
    isEnglish = false;
    service = inject(UserRoleService);

    // ✅ Signal initialized at class level with static configuration
    tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({
        inputUrl: {
            getAll: 'v1/userrole/getpaged',
            getAllMethod: 'POST',
            delete: 'v1/userrole/delete'
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
                header: 'مسمي صلاحية المستخدم',
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
        this.openDialog(AddEditUserRoleComponent, this.localize.translate.instant('اضافة صلاحية المستخدم'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditUserRoleComponent, this.localize.translate.instant('تعديل صلاحية المستخدم'), {
            pageType: 'edit',
            row: { rowData }
        });
    }
}
