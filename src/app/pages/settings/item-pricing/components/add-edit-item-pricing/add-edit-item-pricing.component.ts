import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItemPricingService, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-edit-item-pricing',
    standalone: true,
    imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
    templateUrl: './add-edit-item-pricing.component.html',
    styleUrl: './add-edit-item-pricing.component.scss'
})
export class AddEditItemPricingComponent extends BaseEditComponent implements OnInit {
    itemPricingService: ItemPricingService = inject(ItemPricingService);
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
            this.getEditItemPricing();
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

    getEditItemPricing = () => {
        this.itemPricingService.getEditItemPricing(this.id).subscribe((itempPricing: any) => {
            this.initFormGroup();
            this.form.patchValue(itempPricing);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this.itemPricingService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.itemPricingService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
