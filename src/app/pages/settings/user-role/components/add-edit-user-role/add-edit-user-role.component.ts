import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRoleService, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-edit-treasury',
    standalone: true,
    imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
    templateUrl: './add-edit-user-role.component.html',
    styleUrl: './add-edit-user-role.component.scss'
})
export class AddEditUserRoleComponent extends BaseEditComponent implements OnInit {
    _userRoleService: UserRoleService = inject(UserRoleService);
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
            this.getEditUserRole();
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

    getEditUserRole = () => {
        this._userRoleService.getEditUserRole(this.id).subscribe((itempPricing: any) => {
            this.initFormGroup();
            this.form.patchValue(itempPricing);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this._userRoleService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this._userRoleService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
