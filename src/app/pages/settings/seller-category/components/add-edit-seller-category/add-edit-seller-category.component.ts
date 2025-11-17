import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SellerCategoryService, PrimeInputTextComponent, SubmitButtonsComponent } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-edit-seller-category',
  standalone: true,
  imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent],
  templateUrl: './add-edit-seller-category.component.html',
  styleUrl: './add-edit-seller-category.component.scss'
})
export class AddEditSellerCategoryComponent extends BaseEditComponent implements OnInit {
  _sellerCategoryService: SellerCategoryService = inject(SellerCategoryService);
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
      this.getEditSellerCategory();
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

  getEditSellerCategory = () => {
    this._sellerCategoryService.getEditSellerCategory(this.id()).subscribe((itempPricing: any) => {
      this.initFormGroup();
      this.form.patchValue(itempPricing);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this._sellerCategoryService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this._sellerCategoryService.update({ id: this.id(), ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
