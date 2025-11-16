import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrgStructureJobTitlesService, OrgStructuresService, PrimeAutoCompleteComponent, SubmitButtonsComponent } from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { JobTitlesService } from '../../../../shared/services/settings/job-titles/job-titles.service';

@Component({
    selector: 'app-add-edit-org-structure-job-title',
    standalone: true,
    imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeAutoCompleteComponent],
    templateUrl: './add-edit-org-structure-job-title.component.html',
    styleUrl: './add-edit-org-structure-job-title.component.scss'
})
export class AddEditOrgStructureJobTitleComponent extends BaseEditComponent implements OnInit {
    selectedOrgStructure: any;
    selectedJobTitle: any;
    filteredOrgStructures: any[] = [];
    filteredJobTitles: any[] = [];

    orgStructureJobTitlesService: OrgStructureJobTitlesService = inject(OrgStructureJobTitlesService);
    orgStructuresService: OrgStructuresService = inject(OrgStructuresService);
    jobTitlesService: JobTitlesService = inject(JobTitlesService);
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
            this.getEditOrgStructureJobTiltle();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            orgStructureId: ['', Validators.required],
            jobTitleId: ['', Validators.required]
        });
    }

    getOrgStructures(event: any) {
        const query = event.query.toLowerCase();
        this.orgStructuresService.orgStructures.subscribe({
            next: (res: any) => {
                this.filteredOrgStructures = res.filter((OrgStructure: any) => OrgStructure.name.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات الهياكل التنظيمية للمؤسسة');
            }
        });
    }

    onOrgStructureSelect(event: any) {
        this.selectedOrgStructure = event.value;
        this.form.get('orgStructureId')?.setValue(this.selectedOrgStructure.id);
    }

    getJobTitles(event: any) {
        const query = event.query.toLowerCase();
        this.jobTitlesService.jobTitles.subscribe({
            next: (res: any) => {
                this.filteredJobTitles = res.filter((jobTitle: any) => jobTitle.name.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات الادوار الوظيفية');
            }
        });
    }

    onJobTitleSelect(event: any) {
        this.selectedJobTitle = event.value;
        this.form.get('jobTitleId')?.setValue(this.selectedJobTitle.id);
    }

    fetchOrgStructureDetails(orgStructureJobTitle: any) {
        this.orgStructuresService.orgStructures.subscribe((response: any) => {
            this.filteredOrgStructures = Array.isArray(response) ? response : response.data || [];
            this.selectedOrgStructure = this.filteredOrgStructures.find((orgStructure: any) => orgStructure.id === orgStructureJobTitle.orgStructureId);
            this.form.get('orgStructureId')?.setValue(this.selectedOrgStructure.id);
        });
    }

    fetchJobTitleDetails(orgStructureJobTitle: any) {
        this.jobTitlesService.jobTitles.subscribe((response: any) => {
            this.filteredJobTitles = Array.isArray(response) ? response : response.data || [];
            this.selectedJobTitle = this.filteredJobTitles.find((jobTitle: any) => jobTitle.id === orgStructureJobTitle.jobTitleId);
            this.form.get('jobTitleId')?.setValue(this.selectedJobTitle.id);
        });
    }

    getEditOrgStructureJobTiltle = () => {
        this.orgStructureJobTitlesService.getEditOrgStructureJobTitle(this.id()).subscribe((orgStructureJobTitle: any) => {
            this.initFormGroup();
            this.form.patchValue(orgStructureJobTitle);
            this.fetchOrgStructureDetails(orgStructureJobTitle);
            this.fetchJobTitleDetails(orgStructureJobTitle);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this.orgStructureJobTitlesService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.orgStructureJobTitlesService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
