import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeDatepickerComponent, ItemsService, VendorService, PrimeCheckBoxComponent, ItemCategoriesService, SellsListService, PrimeRadioButtonComponent } from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TabsModule } from 'primeng/tabs';
import { ItemTabs } from '../../../../core/enums/items-tabs';
import { ItemItemUnitsComponent } from '../item-item-units/item-item-units.component';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddEditItemItemUnitComponent } from '../add-edit-item-item-unit/add-edit-item-item-unit.component';
import { EnumDto } from '../../../../shared/interfaces';


@Component({
    selector: 'app-add-edit-item',
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, TabsModule,PrimeCheckBoxComponent,StepperModule,PrimeDatepickerComponent,ButtonModule,PrimeRadioButtonComponent],
    templateUrl: './add-edit-item.component.html',
    styleUrl: './add-edit-item.component.scss'
})
export class AddEditItemComponent extends BaseEditComponent implements OnInit {
    sellsList: EnumDto[] = [];
    selectedItemCategory: any;
    selectedItemVendor: any;
    filteredItemVendors: any[] = [];
    filteredItemCategorys: any[] = [];
    itemId: string = '';
    showItemTabs: boolean = false;
    activeTab: ItemTabs = ItemTabs.General;
     dialogRef: DynamicDialogRef | undefined;
    itemsService: ItemsService = inject(ItemsService);
    SellsListService: SellsListService = inject(SellsListService);
    vendorService: VendorService = inject(VendorService);
    itemCategoriesService: ItemCategoriesService = inject(ItemCategoriesService);
    dialogService: DialogService = inject(DialogService);


    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;
        if (this.pageType === 'edit') {
            this.getEditItem();
            this.itemId = this.activatedRoute.snapshot.paramMap.get('id') as string;
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [],
            code: ['', Validators.required],
             nameAr: ['', Validators.required],
            nameEn: ['', Validators.required],
            itemVendorId: [null, Validators.required],
            itemCategoryId: [null, Validators.required],
            checkRest:[false],
            stopSell: [false],
            isActive: [false],  
            expireDays: [0, Validators.required],
            orderLimit: [0, Validators.required],
            idleLimit: [0, Validators.required],
            maxSellDiscount: [0, Validators.required], 
            sellsList:['',Validators.required]     
        });
    }


     getSellsList() {
    this.SellsListService.sellsList.subscribe({
      next: res => {
        this.sellsList = res;
      },
      error: err => {
        this.alert.error(this.localize.translate.instant('خطأ في جلب البيانات'));
      }
    });
  }
    getItemVendors(event: any) {
        const query = event.query.toLowerCase();
        this.vendorService.Vendors.subscribe({
            next: (res:any) => {
                this.filteredItemVendors = res.filter((itemVendor: any) => itemVendor.nameAr.toLowerCase().includes(query) || itemVendor.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات المصنع');
            }
        });
    }

    onItemVendorSelect(event: any) {
        this.selectedItemVendor = event.value;
        this.form.get('itemVendorId')?.setValue(this.selectedItemVendor.id);
    }


    getItemCategorys(event: any) {
        const query = event.query.toLowerCase();
        this.itemCategoriesService.itemCategories.subscribe({
            next: (res:any) => {
                this.filteredItemCategorys = res.filter((itemCategory: any) => itemCategory.nameAr.toLowerCase().includes(query) || itemCategory.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات تصنيفات العنصر');
            }
        });
    }

      onItemCategorySelect(event: any) {
        this.selectedItemCategory = event.value;
        this.form.get('itemCategoryId')?.setValue(this.selectedItemCategory.id);
    }
    get itemEnum() {
        return ItemTabs;
    }



     openAddPosition(): void {
    this.dialogRef = this.dialogService.open(AddEditItemItemUnitComponent, {
      header: this.localize.translate.instant('PAGES.EMPLOYEES.VACANT_POSITIONS.ADD'),
      width: '880px',
      modal: true,
      breakpoints: {
        '1199px': '75vw',
        '575px': '90vw'
      },
      data: {
        pageType: 'add',
        row: {
          unitId: this.form.get('unitId')?.value,
          unitNameAr: this.form.get('unitNameAr')?.value,
          unitNameEn: this.form.get('unitNameEn')?.value
        }
      }
    });
  }
    getEditItem = () => {
        this.itemsService.getEditItem(this.id).subscribe((item: any) => {
            console.log('item',item);
            this.initFormGroup();
            this.form.patchValue(item);
            this.fetchItemVendorDetails(item);
            this.fetchItemCategoryDetails(item)
        });
    };

    fetchItemVendorDetails(item: any) {
        this.vendorService.Vendors.subscribe((response: any) => {
            this.filteredItemVendors = Array.isArray(response) ? response : response.data || [];
            this.selectedItemVendor = this.filteredItemVendors.find((itemVendor: any) => itemVendor.id === item.itemVendorId);
            this.form.get('itemVendorId')?.setValue(this.selectedItemVendor?.id);
        });
    }

      fetchItemCategoryDetails(item: any) {
        this.itemCategoriesService.itemCategories.subscribe((response: any) => {
            this.filteredItemCategorys = Array.isArray(response) ? response : response.data || [];
            this.selectedItemCategory = this.filteredItemCategorys.find((itemCategory: any) => itemCategory.id === item.itemCategoryId);
            this.form.get('itemCategoryId')?.setValue(this.selectedItemCategory?.id);
        });
    }

  
    submit() {
        if (this.pageType === 'add') {
            this.itemsService.add(this.form.value).subscribe((res: any) => {
                this.itemId = res;
                this.showItemTabs = true;
                this.router.navigate(['/pages/items/edit/', res]);
            });
        }
        if (this.pageType === 'edit') {
            this.itemsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.redirect();
            });
        }
    }

    override redirect = () => {
        super.redirect('/pages/items');
    };
}
