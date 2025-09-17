import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeAutoCompleteComponent, SubmitButtonsComponent, UserGroupsService, UsersService } from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { UserUserGroupService } from '../../../../shared/services/pages/user-user-group/user-user-group.service';

@Component({
    selector: 'app-add-edit-user-user-group',
    imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeAutoCompleteComponent],
    templateUrl: './add-edit-user-user-group.component.html',
    styleUrl: './add-edit-user-user-group.component.scss'
})
export class AddEditUserUserGroupComponent extends BaseEditComponent implements OnInit {
    selectedUser: any;
    selectedUserGroup: any;
    filteredUser: any[] = [];
    filteredUserGroup: any[] = [];

    userGroupService: UserGroupsService = inject(UserGroupsService);
    userService: UsersService = inject(UsersService);
    userUserGroupService: UserUserGroupService = inject(UserUserGroupService);

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
            this.getEditUserUserGroup();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            // user: ['', Validators.required],
            // userGroup: ['', Validators.required],
            userId: [null, Validators.required],
            userGroupId: [null, Validators.required]
        });
    }

    getUser(event: any) {
        const query = event.query.toLowerCase();
        this.userService.users.subscribe({
            next: (res: any) => {
                this.filteredUser = res.filter((user: any) => user.userName.toLowerCase().includes(query) || user.name.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات المستخدم');
            }
        });
    }

    onUserSelect(event: any) {
        this.selectedUser = event.value;
        this.form.get('userId')?.setValue(this.selectedUser.id);
    }

    getUserGroup(event: any) {
        const query = event.query.toLowerCase();
        this.userGroupService.userGroups.subscribe({
            next: (res: any) => {
                this.filteredUserGroup = res.filter((userGroup: any) => userGroup.nameAr.toLowerCase().includes(query) || userGroup.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات المجموعات الوظيفية');
            }
        });
    }

    onUserGroupSelect(event: any) {
        this.selectedUserGroup = event.value;
        this.form.get('userGroupId')?.setValue(this.selectedUserGroup.id);
    }

    getEditUserUserGroup = () => {
        this.userUserGroupService.getEditUserUsergroup(this.id).subscribe((userUserGroup: any) => {
            this.initFormGroup();
            this.form.patchValue(userUserGroup);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this.userUserGroupService.add(this.form.value).subscribe(() => {
                this.closeDialog();
                console.log(this.form.value);
            });
        if (this.pageType === 'edit')
            this.userUserGroupService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
