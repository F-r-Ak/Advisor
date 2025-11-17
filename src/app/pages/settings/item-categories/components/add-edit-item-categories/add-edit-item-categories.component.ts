import { filter } from 'rxjs/operators';
import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryTypesService, ItemCategoriesService, PrimeAutoCompleteComponent, PrimeInputTextComponent, SellsListService, SubmitButtonsComponent } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { UpdateItemCategoryDto } from '../../../../../shared/interfaces';
import { SellsList } from '../../../../../core/enums/sells-list';

@Component({
  selector: 'app-add-edit-item-categories',
  standalone: true,
  imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent],
  templateUrl: './add-edit-item-categories.component.html',
  styleUrl: './add-edit-item-categories.component.scss'
})
export class AddEditItemCategoriesComponent extends BaseEditComponent implements OnInit {
  selectedSellsList: any;
  selectedParentCategory: any;
  selectedCategoryType: any;
  filteredCategoryTypes: any[] = [];
  filteredSellsList: any[] = [];
  filteredParentCategories: any[] = [];

  itemCategoriesService: ItemCategoriesService = inject(ItemCategoriesService);
  sellsListService: SellsListService = inject(SellsListService);
  categoryTypesService: CategoryTypesService = inject(CategoryTypesService);

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
        console.log('element ::', element);
      }
    });
    if (this.pageType === 'edit') {
      this.getEditItemCategory();
    } else {
      this.initFormGroup();
    }
  }

  initFormGroup() {
    this.form = this.fb.group({
      id: [''],
      code: ['', Validators.required],
      nameAr: ['', Validators.required],
      nameEn: [''],
      sellsList: [1, Validators.required],
      theOrder: [0, Validators.required],
      categoryType: [1, Validators.required],
      parentCategoryId: ['']
    });
  }

  getSellsList(event: any) {
    const query = event.query.toLowerCase();
    this.sellsListService.sellsList.subscribe({
      next: (res: any) => {
        this.filteredSellsList = res.filter((sellsList: any) => sellsList.nameAr.toLowerCase().includes(query) || sellsList.nameEn.toLowerCase().includes(query));
        console.log('filteredSellsList ::', this.filteredSellsList);
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات  قائمة البيع');
      }
    });
  }

  onSellsListSelect(event: any) {
    this.selectedSellsList = event.value;
    console.log('selectedSellsList ::', typeof this.selectedSellsList.id, this.selectedSellsList.id);
    console.log('selectedSellsList :: ', this.selectedSellsList);

    this.form.get('sellsList')?.setValue(this.selectedSellsList.id);
  }

  getCategoryTypes(event: any) {
    const query = event.query.toLowerCase();
    this.categoryTypesService.categoryTypes.subscribe({
      next: (res: any) => {
        this.filteredCategoryTypes = res.filter((categoryType: any) => categoryType.nameAr.toLowerCase().includes(query) || categoryType.nameEn.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات  تصنيفات العناصر');
      }
    });
  }

  onCategoryTypeSelect(event: any) {
    this.selectedCategoryType = event.value;
    this.form.get('categoryType')?.setValue(this.selectedCategoryType.id);
    console.log('selectedCategoryType ::', typeof this.selectedCategoryType.id, this.selectedCategoryType.id);
  }

  getParentCategories(event: any) {
    const query = event.query.toLowerCase();
    this.itemCategoriesService.itemCategories.subscribe({
      next: (res: any) => {
        this.filteredParentCategories = res.filter((parentCategory: any) => parentCategory.nameAr.toLowerCase().includes(query) || parentCategory.nameEn.toLowerCase().includes(query));
      },
      error: (err) => {
        this.alert.error('خطأ فى جلب بيانات  تصنيفات العناصر');
      }
    });
  }

  onParentCategorySelect(event: any) {
    this.selectedParentCategory = event.value;
    this.form.get('parentCategoryId')?.setValue(this.selectedParentCategory.id);
  }

  fetchCategoryTypeDetails(itemCategory: any) {
    this.categoryTypesService.categoryTypes.subscribe((response: any) => {
      this.filteredCategoryTypes = Array.isArray(response) ? response : response.data || [];
      this.selectedCategoryType = this.filteredCategoryTypes.find((type: any) => type.nameEn === itemCategory.categoryType);
      this.form.get('categoryType')?.setValue(this.selectedCategoryType.id);
    });
  }

  fetchSellsListDetails(itemCategory: any) {
    this.sellsListService.sellsList.subscribe((response: any) => {
      this.filteredSellsList = Array.isArray(response) ? response : response.data || [];
      this.selectedSellsList = this.filteredSellsList.find((list: any) => list.id === Number(itemCategory.sellsList));
      this.form.get('sellsList')?.setValue(this.selectedSellsList.id);
    });
  }

  fetchItemCategoryDetails(itemCategory: any) {
    this.itemCategoriesService.itemCategories.subscribe((response: any) => {
      this.filteredParentCategories = Array.isArray(response) ? response : response.data || [];
      const selectItemCategory = this.filteredParentCategories.find((category: any) => category.id === itemCategory.parentCategoryId);

      if (selectItemCategory) {
        this.selectedParentCategory = selectItemCategory;
        this.form.get('parentCategoryId')?.setValue(this.selectedParentCategory.id);
      }
      // } else {
      //     console.log('%cNo parent category found', 'color:red;font-family:system-ui;font-size:4rem;-webkit-text-stroke: 1px black;font-weight:bold');
      // }
    });
  }

  getEditItemCategory = () => {
    this.itemCategoriesService.getEditItemCategory(this.id()).subscribe((Icategory: UpdateItemCategoryDto) => {
      this.initFormGroup();
      this.form.patchValue(Icategory);
      this.fetchCategoryTypeDetails(Icategory);
      this.fetchSellsListDetails(Icategory);
      this.fetchItemCategoryDetails(Icategory);
    });
  };

  submit() {
    if (this.pageType === 'add')
      this.itemCategoriesService.add(this.form.value).subscribe(() => {
        this.closeDialog();
      });
    if (this.pageType === 'edit')
      this.itemCategoriesService.update({ id: this.id(), ...this.form.value }).subscribe(() => {
        this.closeDialog();
      });
  }

  closeDialog() {
    this.dialogService.dialogComponentRefMap.forEach((dialog) => {
      dialog.destroy();
    });
  }
}
