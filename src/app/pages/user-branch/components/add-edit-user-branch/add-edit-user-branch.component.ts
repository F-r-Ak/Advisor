import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchsService, PrimeAutoCompleteComponent, SubmitButtonsComponent, UsersService } from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { UserBranchService } from '../../../../shared/services/pages/user-branch/user-branch.service';
import { Lookup } from '../../../../shared/interfaces';

@Component({
    selector: 'app-add-edit-user-branch',
    imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeAutoCompleteComponent],
    templateUrl: './add-edit-user-branch.component.html',
    styleUrl: './add-edit-user-branch.component.scss'
})
export class AddEditUserBranchComponent extends BaseEditComponent implements OnInit {
    selectedUser: any;
    selectedBranch: Lookup | undefined;
    filteredUsers: any[] = [];
    filteredBranchs: Lookup[] = [];

    userBranchService: UserBranchService = inject(UserBranchService);
    userService: UsersService = inject(UsersService);
    branchService: BranchsService = inject(BranchsService);

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
            this.getEditUserBranch();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            userId: [null, Validators.required],
            branchId: [null, Validators.required]
        });
    }

    getUser(event: any) {
        const query = event.query.toLowerCase();
        this.userService.users.subscribe({
            next: (res: any) => {
                this.filteredUsers = res.filter((user: any) => user.userName.toLowerCase().includes(query) || user.name.toLowerCase().includes(query));
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

    getBranch(event: any) {
        const query = event.query.toLowerCase();
        this.branchService.branchs.subscribe({
            next: (res: any) => {
                this.filteredBranchs = res.filter((branch: any) => branch.nameAr.toLowerCase().includes(query) || branch.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات الفرع');
            }
        });
    }

    onBranchSelect(event: any) {
        this.selectedBranch = event.value;
        this.form.get('branchId')?.setValue(this.selectedBranch?.id);
    }

    fetchUserDetails(userBranch: any) {
        this.userService.users.subscribe((response: any) => {
            this.filteredUsers = Array.isArray(response) ? response : response.data || [];
            this.selectedUser = this.filteredUsers.find((user: any) => user.id === userBranch.userId);
            this.form.get('userId')?.setValue(this.selectedUser.id);
        });
    }

    fetchBranchDetails(userBranch: any) {
        this.branchService.branchs.subscribe({
            next: (response: any) => {
                this.filteredBranchs = Array.isArray(response) ? response : response.data || [];
                this.selectedBranch = this.filteredBranchs.find((branch: any) => branch.id === userBranch.branchId);
                this.form.get('branchId')?.setValue(this.selectedBranch?.id);
            }
        });
    }

    getEditUserBranch = () => {
        this.userBranchService.getEditUserBranch(this.id).subscribe((userBranch: any) => {
            this.initFormGroup();
            this.form.patchValue(userBranch);
            this.fetchUserDetails(userBranch);
            this.fetchBranchDetails(userBranch);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this.userBranchService.add(this.form.value).subscribe(() => {
                this.closeDialog();
                console.log(this.form.value);
            });
        if (this.pageType === 'edit')
            this.userBranchService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
