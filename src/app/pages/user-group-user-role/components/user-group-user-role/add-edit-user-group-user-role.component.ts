import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeAutoCompleteComponent, SubmitButtonsComponent, UserGroupsService, UserRoleService } from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { UserGroupUserRoleService } from '../../../../shared/';

@Component({
  selector: 'app-add-edit-user-groups-user-roles',
  imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeAutoCompleteComponent],
  templateUrl: './add-edit-user-group-user-role.component.html',
  styleUrl: './add-edit-user-group-user-role.component.scss'
})
export class AddEditUserGroupUserRoleComponent extends BaseEditComponent implements OnInit {
  selectedUserGroup: any;
  selectedUserRole: any;
  filteredUserGroups: any[] = [];
  filteredUserRoles: any[] = [];

  userGroupService: UserGroupsService = inject(UserGroupsService);
  userRoleService: UserRoleService = inject(UserRoleService);
  userGroupUserRoleService: UserGroupUserRoleService = inject(UserGroupUserRoleService);

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
      this.getEditUserGroupUserRole();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      id: [''],
      userGroupId: [null, Validators.required],
      userRoleId: [null, Validators.required]
    });
  }

  getUserRoles(event: any) {
    const query = event.query.toLowerCase();
    this.userRoleService.userRoles.subscribe({
      next: (res: any) => {
        this.filteredUserRoles = res.filter((userRole: any) => userRole.nameAr.toLowerCase().includes(query) || userRole.nameEn.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات صلاحيات المستخدمين');
      }
    });
  }

  onUserRoleSelect(event: any) {
    this.selectedUserRole = event.value;
    this.form.get('userRoleId')?.setValue(this.selectedUserRole.id);
    console.log('this.selectedUserRole ::', this.selectedUserRole);
  }

  getUserGroups(event: any) {
    const query = event.query.toLowerCase();
    this.userGroupService.userGroups.subscribe({
      next: (res: any) => {
        this.filteredUserGroups = res.filter((userGroup: any) => userGroup.nameAr.toLowerCase().includes(query) || userGroup.nameEn.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات الادوار ');
      }
    });
  }

  onUserGroupSelect(event: any) {
    this.selectedUserGroup = event.value;
    this.form.get('userGroupId')?.setValue(this.selectedUserGroup.id);
  }

  fetchUserGroupDetails(userGroupsUserRole: any) {
    this.userGroupService.userGroups.subscribe((response: any) => {
      this.filteredUserGroups = Array.isArray(response) ? response : response.data || [];
      console.log('');
      this.selectedUserGroup = this.filteredUserGroups.find((group: any) => group.id === userGroupsUserRole.userGroupId);
      this.form.get('userGroupId')?.setValue(this.selectedUserGroup.id);
    });
  }

  fetchUserRoleDetails(userGroupsUserRole: any) {
    this.userRoleService.userRoles.subscribe((response: any) => {
      this.filteredUserRoles = Array.isArray(response) ? response : response.data || [];
      this.selectedUserRole = this.filteredUserRoles.find((role: any) => role.id === userGroupsUserRole.userRoleId);
      this.form.get('userRoleId')?.setValue(this.selectedUserRole?.id);
    });
  }

  getEditUserGroupUserRole = () => {
    this.userGroupUserRoleService.getEditUserGroupUserRole(this.id()).subscribe((userGroupUserRole: any) => {
      this.initFormGroup();
      this.form.patchValue(userGroupUserRole);
      this.fetchUserGroupDetails(userGroupUserRole);
      this.fetchUserRoleDetails(userGroupUserRole);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.userGroupUserRoleService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.userGroupUserRoleService.update({ id: this.id(), ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
