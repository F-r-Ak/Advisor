import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeInputTextComponent, SubmitButtonsComponent, PrimeDatepickerComponent, PrimeAutoCompleteComponent, UsersService } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../../shared/services/settings/employee/employee.service';

@Component({
    selector: 'app-add-edit-employee',
    imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeDatepickerComponent, PrimeAutoCompleteComponent],
    templateUrl: './add-edit-employee.component.html',
    styleUrl: './add-edit-employee.component.scss'
})
export class AddEditEmployeeComponent extends BaseEditComponent implements OnInit {
    employeeService: EmployeeService = inject(EmployeeService);
    usersService: UsersService = inject(UsersService);
    selectedOrgStructure: any;
    selectedUser: any;
    filteredUser: any[] = [];
    filteredOrgStructure: any[] = [];
    dialogService: DialogService = inject(DialogService);
    employeeId: string = '';

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        if (this.pageType === 'edit') {
            this.getEditEmployee();
            this.employeeId = this.activatedRoute.snapshot.paramMap.get('id') as string;
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            code: ['', Validators.required],
            nameAr: ['', Validators.required],
            nameEn: ['', Validators.required],
            fullName: ['', Validators.required],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            email: ['', Validators.required],
            nationalId: ['', Validators.required],
            hireDate: ['', Validators.required],
            birthDate: ['', Validators.required],
            orgStructureId: ['', Validators.required],
            jobTitleId: ['', Validators.required],
            branchId: ['', Validators.required],
            departmentId: ['', Validators.required],
            userId: [null, Validators.required]
        });
    }

    getUsers(event: any) {
        const query = event.query.toLowerCase();
        this.usersService.users.subscribe({
            next: (res: any) => {
                this.filteredUser = res.filter((user: any) => user.name.toLowerCase().includes(query) || user.userName.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات المستخدمين');
            }
        });
    }

    onUserSelect(event: any) {
        this.selectedUser = event.value;
        this.form.get('userId')?.setValue(this.selectedUser.id);
        console.log('this.selectedUser.id', this.selectedUser.id);
    }

    getEditEmployee = () => {
        this.employeeService.getEditEmployee(this.id).subscribe((res: any) => {
            this.initFormGroup();
            this.form.patchValue(res);
            this.fetchUserDetails(res);
        });
    };

    fetchUserDetails(item: any) {
        this.usersService.users.subscribe((response: any) => {
            this.filteredUser = Array.isArray(response) ? response : response.data || [];
            this.selectedUser = this.filteredUser.find((user: any) => user.id === user.userId);
            this.form.get('userId')?.setValue(this.selectedUser?.id);
        });
    }

    // getOrgStructure(event: any) {
    //     const query = event.query.toLowerCase();
    //     this._employeeService.Employees.subscribe({
    //         next: (res: any) => {
    //             this.filteredOrgStructure = res.filter((orgStructure: any) => orgStructure.nameAr.toLowerCase().includes(query) || orgStructure.nameEn.toLowerCase().includes(query));
    //         },
    //         error: (err) => {
    //             this.alert.error('خطأ فى جلب بيانات المؤسسة');
    //         }
    //     });
    // }
    onOrgStructureSelect(event: any) {
        this.selectedOrgStructure = event.value;
        this.form.get('orgStructureId')?.setValue(this.selectedOrgStructure.id);
    }

    submit() {
        if (this.pageType === 'add')
            this.employeeService.add(this.form.value).subscribe((res: any) => {
                this.employeeId = res;
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.employeeService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
