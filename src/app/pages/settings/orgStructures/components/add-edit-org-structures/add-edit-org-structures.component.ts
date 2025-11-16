import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrgStructuresService, PrimeAutoCompleteComponent, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-add-edit-org-structures',
    imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent],
    templateUrl: './add-edit-org-structures.component.html',
    styleUrl: './add-edit-org-structures.component.scss'
})
export class AddEditOrgStructuresComponent extends BaseEditComponent implements OnInit {
    selectedOrgStructure: any;
    selectedParentId: any;
    filteredOrgStructures: any[] = [];

    orgStructuresService: OrgStructuresService = inject(OrgStructuresService);
    dialogService: DialogService = inject(DialogService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dialogService.dialogComponentRefMap.forEach((element) => {
            this.pageType = element.instance.ddconfig.data.pageType;
            if (this.pageType === 'edit') {
                this.id = element.instance.ddconfig.data.row.rowData.id;
            }
        });
        if (this.pageType === 'edit') {
            this.getEditBranchs();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            // code: ['', Validators.required],
            name: ['', Validators.required],
            parentId: ['']
        });
    }

    getOrgStructures(event: any) {
        const query = event.query.toLowerCase();
        this.orgStructuresService.orgStructures.subscribe({
            next: (res: any) => {
                this.filteredOrgStructures = res.filter((orgStr: any) => orgStr.name.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات الهياكل التنظيمية');
            }
        });
    }

    onOrgStructureSelect(event: any) {
        this.selectedOrgStructure = event.value;
        this.form.get('parentId')?.setValue(this.selectedOrgStructure.id);
    }

    fetchOrgStructureDetails(mainOrgStructure: any) {
        this.orgStructuresService.orgStructures.subscribe((response: any) => {
            this.filteredOrgStructures = Array.isArray(response) ? response : response.data || [];
            this.selectedOrgStructure = this.filteredOrgStructures.find((parentOrgStructure: any) => parentOrgStructure.id === mainOrgStructure.parentCategoryId);

            if (this.selectedOrgStructure) {
                this.selectedParentId = this.selectedOrgStructure;
                this.form.get('parentId')?.setValue(this.selectedParentId.id);
            }
        });
    }

    getEditBranchs = () => {
        this.orgStructuresService.getEditOrgStructure(this.id()).subscribe((orgStructure: any) => {
            this.initFormGroup();
            this.form.patchValue(orgStructure);
            this.fetchOrgStructureDetails(orgStructure);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this.orgStructuresService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.orgStructuresService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
