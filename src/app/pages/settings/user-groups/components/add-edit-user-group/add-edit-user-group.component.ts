import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserGroupsService, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-user-group',
  standalone: true,
  imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
  templateUrl: './add-edit-user-group.component.html',
  styleUrl: './add-edit-user-group.component.scss'
})
export class AddEditUserGroupComponent extends BaseEditComponent implements OnInit {
  userGroupsService: UserGroupsService = inject(UserGroupsService);
  dialogService: DialogService = inject(DialogService);

  constructor(override activatedRoute: ActivatedRoute) {
    super(activatedRoute);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.dialogService.dialogComponentRefMap.forEach((element) => {
      this.pageType = element.instance.ddconfig.data.pageType;
      if (this.pageType === 'edit') {
        this.id.set(element.instance.ddconfig.data.row.rowData.id as string);
      }
    });
    if (this.pageType === 'edit') {
      this.getEditUserGroup();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      id: [''],
      code: ['', Validators.required],
      nameAr: ['', Validators.required],
      nameEn: ['']
    });
  }

  getEditUserGroup = () => {
    this.userGroupsService.getEditUserGroup(this.id()).subscribe((branch: any) => {
      this.initFormGroup();
      this.form.patchValue(branch);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.userGroupsService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.userGroupsService.update({ id: this.id(), ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
