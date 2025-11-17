import { Component, effect, inject, Input, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { BaseListComponent } from '../../../../../base/components/base-list-component';
import { PrimeDataTableComponent, PrimeTitleToolBarComponent, PositionsService } from '../../../../../shared';
import { CardModule } from 'primeng/card';
import { TableOptions } from '../../../../../shared/interfaces';
import { AddEditPositionComponent } from '../../components/add-edit-position/add-edit-position.component';

@Component({
    selector: 'app-positions',
    standalone: true,
    imports: [TranslateModule, RouterModule, CardModule, PrimeDataTableComponent, PrimeTitleToolBarComponent],
    templateUrl: './positions.component.html',
    styleUrl: './positions.component.scss'
})
export class PositionsComponent extends BaseListComponent {
    @Input() employeeId: string = '';
    isEnglish = false;
    service = inject(PositionsService);

    // ✅ Signal initialized at class level with static configuration
    tableOptions: WritableSignal<TableOptions> = signal<TableOptions>({
        inputUrl: {
            getAll: 'v1/position/getPaged',
            getAllMethod: 'POST',
            delete: 'v1/position/deletesoft'
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

    override ngOnInit(): void {
        super.ngOnInit();
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
                header: 'المسمى الوظيفي',
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
        this.openDialog(AddEditPositionComponent, this.localize.translate.instant('اضافة مسمى وظيفي'), {
            pageType: 'add'
        });
    }

    openEdit(rowData: any) {
        this.openDialog(AddEditPositionComponent, this.localize.translate.instant('تعديل مسمى وظيفي'), {
            pageType: 'edit',
            row: { rowData }
        });
    }
}
