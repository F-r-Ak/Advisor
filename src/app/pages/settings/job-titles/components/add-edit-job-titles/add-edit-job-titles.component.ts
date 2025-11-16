import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { JobTitlesService } from '../../../../../shared/services/settings/job-titles/job-titles.service';

@Component({
  selector: 'app-add-edit-job-titles',
  imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
  templateUrl: './add-edit-job-titles.component.html',
  styleUrl: './add-edit-job-titles.component.scss'
})
export class AddEditJobTitlesComponent extends BaseEditComponent implements OnInit {
  jobTitlesService: JobTitlesService = inject(JobTitlesService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.dialogService.dialogComponentRefMap.forEach(element => {
      this.pageType = element.instance.ddconfig.data.pageType;
      if (this.pageType === 'edit') {
        this.id.set(element.instance.ddconfig.data.row.rowData.id as string);
      }
    });
    if (this.pageType === 'edit') {
      this.getEditJobTitles();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  getEditJobTitles = () => {
    this.jobTitlesService.getEditJobTitle(this.id()).subscribe((jobTitle: any) => {
      this.initFormGroup();
      this.form.patchValue(jobTitle);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.jobTitlesService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.jobTitlesService.update({ id: this.id(), ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach(dialog => {
      dialog.destroy();
    });
  }
}
