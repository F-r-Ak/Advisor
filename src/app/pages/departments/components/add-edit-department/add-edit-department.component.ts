import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchsService, DepartmentsService, OrgStructureJobTitlesService, OrgStructuresService, PrimeAutoCompleteComponent, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { JobTitlesService } from '../../../../shared/services/settings/job-titles/job-titles.service';

@Component({
    selector: 'app-add-edit-department',
    standalone: true,
    imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeAutoCompleteComponent, PrimeInputTextComponent],
    templateUrl: './add-edit-department.component.html',
    styleUrl: './add-edit-department.component.scss'
})
export class AddEditDepartmentComponent extends BaseEditComponent implements OnInit {
    selectedBranch: any;
    selectedDepartment: any;
    selectedParentDepartment: any;
    filteredBranchs: any[] = [];
    filteredDepartments: any[] = [];

    departmentsService: DepartmentsService = inject(DepartmentsService);
    branchsService: BranchsService = inject(BranchsService);
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
            this.getEditDepartment();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            branchId: ['', Validators.required],
            parentId: [null]
        });
    }

    getBranchs(event: any) {
        const query = event.query.toLowerCase();
        this.branchsService.branchs.subscribe({
            next: (res: any) => {
                this.filteredBranchs = res.filter((branch: any) => branch.nameAr.toLowerCase().includes(query) || branch.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات الفروع');
            }
        });
    }

    onBranchSelect(event: any) {
        this.selectedBranch = event.value;
        this.form.get('branchId')?.setValue(this.selectedBranch.id);
    }

    getParentDepartments(event: any) {
        const query = event.query.toLowerCase();
        this.departmentsService.departments.subscribe({
            next: (res: any) => {
                this.filteredDepartments = res.filter((department: any) => department.name.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات الادوار الوظيفية');
            }
        });
    }

    onParentDepartmentSelect(event: any) {
        this.selectedDepartment = event.value;
        this.form.get('parentId')?.setValue(this.selectedDepartment.id);
    }

    fetchBranchDetails(department: any) {
        this.branchsService.branchs.subscribe((response: any) => {
            this.filteredBranchs = Array.isArray(response) ? response : response.data || [];
            this.selectedBranch = this.filteredBranchs.find((branch: any) => branch.id === department.branchId);
            this.form.get('branchId')?.setValue(this.selectedBranch.id);
        });
    }

    fetchParentDepartmentDetails(department: any) {
        this.departmentsService.departments.subscribe((response: any) => {
            this.filteredDepartments = Array.isArray(response) ? response : response.data || [];
            this.selectedDepartment = this.filteredDepartments.find((parentDepartment: any) => parentDepartment.id === department.parentId);

            if (this.selectedDepartment) {
                this.selectedParentDepartment = this.selectedDepartment;
                this.form.get('parentId')?.setValue(this.selectedParentDepartment.id);
            }
        });
    }

    getEditDepartment = () => {
        this.departmentsService.getEditDepartment(this.id).subscribe((department: any) => {
            this.initFormGroup();
            this.form.patchValue(department);
            this.fetchBranchDetails(department);
            this.fetchParentDepartmentDetails(department);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this.departmentsService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.departmentsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
