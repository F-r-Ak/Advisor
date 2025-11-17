import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShiftsService, UsersService, BranchsService, PrimeAutoCompleteComponent, PrimeCheckBoxComponent, PrimeInputTextComponent, SubmitButtonsComponent, PrimeDatepickerComponent } from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-shift',
  standalone: true,
  imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeCheckBoxComponent, PrimeDatepickerComponent],
  templateUrl: './add-edit-shift.component.html',
  styleUrl: './add-edit-shift.component.scss'
})
export class AddEditShiftComponent extends BaseEditComponent implements OnInit {
  selectedUser: any;
  selectedBranch: any;
  filteredUsers: any[] = [];
  filteredBranchs: any[] = [];

  shiftsService: ShiftsService = inject(ShiftsService);
  usersService: UsersService = inject(UsersService);
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
      this.getEditShift();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      id: [''],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      userId: ['', Validators.required],
      branchId: ['', Validators.required],
      startValue: [0, Validators.required],
      endValue: [0, Validators.required],
      notes: ['']
    });
  }

  getUsers(event: any) {
    const query = event.query.toLowerCase();
    this.usersService.users.subscribe({
      next: (res: any) => {
        this.filteredUsers = res.filter((user: any) => user.name.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات المستخدمين');
      }
    });
  }

  onUserSelect(event: any) {
    this.selectedUser = event.value;
    this.form.get('userId')?.setValue(this.selectedUser.id);
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
  fetchUserDetails(shift: any) {
    this.usersService.users.subscribe((response: any) => {
      this.filteredUsers = Array.isArray(response) ? response : response.data || [];
      console.log('response of users', response);
      this.selectedUser = this.filteredUsers.find((user: any) => user.id === shift.userId);
      console.log('selected user shift component', this.selectedUser);

      this.form.get('userId')?.setValue(this.selectedUser?.id);
    });
  }
  fetchBranchDetails(shift: any) {
    this.branchsService.branchs.subscribe((response: any) => {
      this.filteredBranchs = Array.isArray(response) ? response : response.data || [];
      console.log('');
      this.selectedBranch = this.filteredBranchs.find((branch: any) => branch.id === shift.branchId);
      this.form.get('branchId')?.setValue(this.selectedBranch?.id);
    });
  }

  getEditShift = () => {
    this.shiftsService.getEditshift(this.id()).subscribe((shift: any) => {
      this.initFormGroup();
      this.form.patchValue(shift);
      this.fetchUserDetails(shift);
      this.fetchBranchDetails(shift);
      console.log('shift details', shift);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.shiftsService.add(this.form.value).subscribe(() => {
        this.closeDialog();
        console.log(this.form.value);
      });
    if (this.pageType === 'edit')
      this.shiftsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
