import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeDatepickerComponent, ItemsService, VendorService, PrimeCheckBoxComponent } from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TabsModule } from 'primeng/tabs';
import { ItemTabs } from '../../../../core/enums/items-tabs';
import { ItemItemUnitsComponent } from '../item-item-units/item-item-units.component';

@Component({
    selector: 'app-add-edit-item',
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, TabsModule, ItemItemUnitsComponent,PrimeCheckBoxComponent],
    templateUrl: './add-edit-item.component.html',
    styleUrl: './add-edit-item.component.scss'
})
export class AddEditItemComponent extends BaseEditComponent implements OnInit {
    selectedGeoPoint: any;
    selectedItemVendor: any;
    filteredItemVendors: any[] = [];
    filteredGeoPoints: any[] = [];
    itemId: string = '';
    showItemTabs: boolean = false;
    activeTab: ItemTabs = ItemTabs.General;
    itemsService: ItemsService = inject(ItemsService);
    vendorService: VendorService = inject(VendorService);

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
            itemVendorId: [0, Validators.required],
            url:['',Validators.required],
            northSide: ['', Validators.required],
            southSide: ['', Validators.required],        
           
            note: ['']
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


    get itemEnum() {
        return ItemTabs;
    }

    getEditItem = () => {
        this.itemsService.getEditItem(this.id).subscribe((item: any) => {
            console.log('item',item);
            this.initFormGroup();
            this.form.patchValue(item);
            this.fetchItemVendorDetails(item);
        });
    };

    fetchItemVendorDetails(item: any) {
        this.vendorService.Vendors.subscribe((response: any) => {
            this.filteredItemVendors = Array.isArray(response) ? response : response.data || [];
            this.selectedItemVendor = this.filteredItemVendors.find((itemVendor: any) => itemVendor.id === item.itemVendorId);
            this.form.get('itemVendorId')?.setValue(this.selectedItemVendor?.id);
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
