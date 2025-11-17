import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimeInputTextComponent, SubmitButtonsComponent, PrimeDatepickerComponent, PrimeAutoCompleteComponent, UsersService, DepartmentsService, BranchsService, OrgStructuresService } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../../../../shared/services/settings/employee/employee.service';
import { JobTitlesService } from '../../../../../shared/services/settings/job-titles/job-titles.service';

@Component({
  selector: 'app-add-edit-employee',
  imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeDatepickerComponent, PrimeAutoCompleteComponent],
  templateUrl: './add-edit-employee.component.html',
  styleUrl: './add-edit-employee.component.scss'
})
export class AddEditEmployeeComponent extends BaseEditComponent implements OnInit {
  employeeService: EmployeeService = inject(EmployeeService);
  usersService: UsersService = inject(UsersService);
  departmentService: DepartmentsService = inject(DepartmentsService);
  branchService: BranchsService = inject(BranchsService);
  jobTitleService: JobTitlesService = inject(JobTitlesService);
  orgStructureService: OrgStructuresService = inject(OrgStructuresService);
  selectedOrgStructure: any;
  selectedUser: any;
  selectedDepartment: any;
  selectedBranch: any;
  selectedJobTitle: any;
  filteredUser: any[] = [];
  filteredOrgStructure: any[] = [];
  filteredDepartment: any[] = [];
  filteredBranch: any[] = [];
  filteredJobTitle: any[] = [];
  dialogService: DialogService = inject(DialogService);
  employeeId: string = '';

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
    // this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if (this.pageType === 'edit') {
      this.getEditEmployee();
      // this.employeeId = this.activatedRoute.snapshot.paramMap.get('id') as string;
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
      userId: [null]
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

  fetchUserDetails(employee: any) {
    this.usersService.users.subscribe((response: any) => {
      this.filteredUser = Array.isArray(response) ? response : response.data || [];
      this.selectedUser = this.filteredUser.find((user: any) => user.id === employee.userId);
      this.form.get('userId')?.setValue(this.selectedUser?.id);
    });
  }

  getDepartments(event: any) {
    const query = event.query.toLowerCase();
    this.departmentService.departments.subscribe({
      next: (res: any) => {
        this.filteredDepartment = res.filter((department: any) => department.name.toLowerCase().includes(query) || department.name.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات القسم');
      }
    });
  }

  onDepartmentSelect(event: any) {
    this.selectedDepartment = event.value;
    this.form.get('departmentId')?.setValue(this.selectedDepartment.id);
    console.log('this.selectedDepartment.id', this.selectedDepartment.id);
  }

  fetchDepartmentDetails(employee: any) {
    this.departmentService.departments.subscribe((response: any) => {
      this.filteredDepartment = Array.isArray(response) ? response : response.data || [];
      this.selectedDepartment = this.filteredDepartment.find((department: any) => department.id === employee.departmentId);
      this.form.get('departmentId')?.setValue(this.selectedDepartment?.id);
    });
  }

  getBranchs(event: any) {
    const query = event.query.toLowerCase();
    this.branchService.branchs.subscribe({
      next: (res: any) => {
        this.filteredBranch = res.filter((branch: any) => branch.nameAr.toLowerCase().includes(query) || branch.nameEn.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات الفرع');
      }
    });
  }

  onBranchSelect(event: any) {
    this.selectedBranch = event.value;
    this.form.get('branchId')?.setValue(this.selectedBranch.id);
    console.log('this.selectedbranch.id', this.selectedBranch.id);
  }

  fetchBranchDetails(employee: any) {
    this.branchService.branchs.subscribe((response: any) => {
      this.filteredBranch = Array.isArray(response) ? response : response.data || [];
      this.selectedBranch = this.filteredBranch.find((branch: any) => branch.id === employee.branchId);
      this.form.get('branchId')?.setValue(this.selectedBranch?.id);
    });
  }

  getJobTitles(event: any) {
    const query = event.query.toLowerCase();
    this.jobTitleService.jobTitles.subscribe({
      next: (res: any) => {
        this.filteredJobTitle = res.filter((jobTitle: any) => jobTitle.name.toLowerCase().includes(query) || jobTitle.nameEn.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات المسميات الوظيفية');
      }
    });
  }

  onJobTitleSelect(event: any) {
    this.selectedJobTitle = event.value;
    this.form.get('jobTitleId')?.setValue(this.selectedJobTitle.id);
    console.log('this.selectedJobTitle.id', this.selectedJobTitle.id);
  }

  fetchJobTitleDetails(employee: any) {
    this.jobTitleService.jobTitles.subscribe((response: any) => {
      this.filteredJobTitle = Array.isArray(response) ? response : response.data || [];
      this.selectedJobTitle = this.filteredJobTitle.find((jobTitle: any) => jobTitle.id === employee.jobTitleId);
      this.form.get('jobTitleId')?.setValue(this.selectedJobTitle?.id);
    });
  }

  getOrgStructures(event: any) {
    const query = event.query.toLowerCase();
    this.orgStructureService.orgStructures.subscribe({
      next: (res: any) => {
        this.filteredOrgStructure = res.filter((orgStructure: any) => orgStructure.name.toLowerCase().includes(query) || orgStructure.name.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات مسميات الهياكل التنظيمية');
      }
    });
  }

  onOrgStructureSelect(event: any) {
    this.selectedOrgStructure = event.value;
    this.form.get('orgStructureId')?.setValue(this.selectedOrgStructure.id);
    console.log('this.selectedOrgStructure.id', this.selectedOrgStructure.id);
  }

  fetchOrgStructureDetails(employee: any) {
    this.orgStructureService.orgStructures.subscribe((response: any) => {
      this.filteredOrgStructure = Array.isArray(response) ? response : response.data || [];
      this.selectedOrgStructure = this.filteredOrgStructure.find((orgStructure: any) => orgStructure.id === employee.orgStructureId);
      this.form.get('orgStructureId')?.setValue(this.selectedOrgStructure?.id);
    });
  }

  getEditEmployee = () => {
    this.employeeService.getEditEmployee(this.id()).subscribe((res: any) => {
      this.initFormGroup();
      console.log('result::', res);
      this.form.patchValue(res);
      this.fetchUserDetails(res);
      this.fetchDepartmentDetails(res);
      this.fetchBranchDetails(res);
      this.fetchJobTitleDetails(res);
      this.fetchOrgStructureDetails(res);
    });
  };

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
