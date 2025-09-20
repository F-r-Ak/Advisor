import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { OrgStructureJobTitlesService, PrimeDataTableComponent, PrimeTitleToolBarComponent } from '../../../../shared';
import { TableOptions } from '../../../../shared/interfaces';
import { BaseListComponent } from '../../../../base/components/base-list-component';
import { takeUntil } from 'rxjs';
import { AddEditOrgStructureJobTitleComponent } from '../../components/add-edit-org-structure-job-title/add-edit-org-structure-job-title.component';

@Component({
    selector: 'app-org-structure-job-titles',
    standalone: true,
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './org-structure-job-titles.component.html',
    styleUrl: './org-structure-job-titles.component.scss'
})
export class OrgStructureJobTitlesComponent extends BaseListComponent {
    @Input() employeeId: string = '';
    isEnglish = false;
    tableOptions!: TableOptions;
    service = inject(OrgStructureJobTitlesService);

    constructor(activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        this.localize.currentLanguage$.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
            this.language = lang;
            this.initializeTableOptions();
        });
    }

    initializeTableOptions() {
        this.tableOptions = {
            inputUrl: {
                getAll: 'v1/orgstructurejobtitles/getPaged',
                getAllMethod: 'POST',
                delete: 'v1/orgstructurejobtitles/deletesoft'
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
            responsiveDisplayedProperties: ['orgStructureName', 'jobTitleName']
        };
    }

    initializeTableColumns(): TableOptions['inputCols'] {
        return [
            {
                field: 'orgStructureName',
                header: 'الهيكل الوظيفي',
                filter: true,
                filterMode: 'text'
            },
            {
                field: 'jobTitleName',
                header: 'الدور الوظيفي',
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
        this.openDialog(AddEditOrgStructureJobTitleComponent, this.localize.translate.instant('اضافة orgStructureJobTitles'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditOrgStructureJobTitleComponent, this.localize.translate.instant('تعديل orgStructureJobTitles'), {
            pageType: 'edit',
            row: { rowData }
        });
    }

    /* when leaving the component */
    override ngOnDestroy() {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
