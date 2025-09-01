import { VendorService } from '../../../../../shared/services/settings/vendor/vendor.service';
import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
    selector: 'app-add-edit-vendor',
    imports: [PrimeInputTextComponent, SubmitButtonsComponent, FormsModule, ReactiveFormsModule, CardModule],
    templateUrl: './add-edit-vendor.component.html',
    styleUrl: './add-edit-vendor.component.scss'
})
export class AddEditVendorComponent extends BaseEditComponent implements OnInit {
    vendorService: VendorService = inject(VendorService);
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
            this.getEditUnit();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            code: ['', Validators.required],
            nameAr: ['', Validators.required],
            nameEn: ['', Validators.required]
        });
    }

    getEditUnit = () => {
        this.vendorService.getEditVendor(this.id).subscribe((unit: any) => {
            this.initFormGroup();
            this.form.patchValue(unit);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this.vendorService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.vendorService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
