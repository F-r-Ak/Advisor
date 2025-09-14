import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientCategoryService, ClientsService, ItemPricingService, PrimeAutoCompleteComponent, PrimeCheckBoxComponent, PrimeInputTextComponent, RegionsService, SubmitButtonsComponent } from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-edit-clients',
    standalone: true,
    imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeCheckBoxComponent],
    templateUrl: './add-edit-clients.component.html',
    styleUrl: './add-edit-clients.component.scss'
})
export class AddEditClientsComponent extends BaseEditComponent implements OnInit {
    selectedClientCategory: any;
    selectedRegion: any;
    selectedItemPricing: any;
    filteredClientCategories: any[] = [];
    filteredRegions: any[] = [];
    filteredItemPricings: any[] = [];
    clientsService: ClientsService = inject(ClientsService);
    clientCategoriesService: ClientCategoryService = inject(ClientCategoryService);
    regionsService: RegionsService = inject(RegionsService);
    itemPricingsService: ItemPricingService = inject(ItemPricingService);
    dialogService: DialogService = inject(DialogService);

    types: any[] = [
        { nameAr: 'شخص', nameEn: 'Person', code: 'person' },
        { nameAr: 'شركة', nameEn: 'Company', code: 'company' }
    ];
    filteredTypes: any[] = [];
    selectedType: any;

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
            this.getEditClients();
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
            name: ['', Validators.required],
            phone: ['', Validators.required],
            address: ['', Validators.required],
            email: ['', Validators.required],
            clientCategoryId: [null, Validators.required],
            regionId: [null, Validators.required],
            itemPricingId: [null, Validators.required],
            type: ['', Validators.required],
            openingBalance: [0, Validators.required],
            paymentTerms: [null, Validators.required],
            maxDebt: [0, Validators.required],
            isActive: [false]
        });
    }

    getClientCategories(event: any) {
        const query = event.query.toLowerCase();
        this.clientCategoriesService.clientCategory.subscribe({
            next: (res: any) => {
                this.filteredClientCategories = res.filter((clientCategory: any) => clientCategory.nameAr.toLowerCase().includes(query) || clientCategory.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات فئة العميل');
            }
        });
    }

    onClientCategorySelect(event: any) {
        this.selectedClientCategory = event.value;
        this.form.get('clientCategoryId')?.setValue(this.selectedClientCategory.id);
    }

    getRegions(event: any) {
        const query = event.query.toLowerCase();
        this.regionsService.regions.subscribe({
            next: (res: any) => {
                this.filteredRegions = res.filter((region: any) => region.nameAr.toLowerCase().includes(query) || region.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات المنطقة');
            }
        });
    }

    onRegionSelect(event: any) {
        this.selectedRegion = event.value;
        this.form.get('regionId')?.setValue(this.selectedRegion.id);
    }

    getItemPricings(event: any) {
        const query = event.query.toLowerCase();
        this.itemPricingsService.itemPricing.subscribe({
            next: (res: any) => {
                this.filteredItemPricings = res.filter((itemPricing: any) => itemPricing.nameAr.toLowerCase().includes(query) || itemPricing.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات تسعير البيع');
            }
        });
    }

    onItemPricingSelect(event: any) {
        this.selectedItemPricing = event.value;
        this.form.get('itemPricingId')?.setValue(this.selectedItemPricing.id);
        this.form.get('regionId')?.setValue(this.selectedItemPricing.id);
    }

    getTypes(event: any) {
        const query = event.query.toLowerCase();

        this.filteredTypes = this.types.filter((type: any) => type.nameAr.toLowerCase().includes(query) || type.nameEn.toLowerCase().includes(query));
    }

    onTypeSelect(event: any) {
        this.selectedType = event.value;
        this.form.get('type')?.setValue(this.selectedType.code);
    }

    getEditClients = () => {
        this.clientsService.getEditclient(this.id).subscribe((client: any) => {
            this.initFormGroup();
            this.form.patchValue(client);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this.clientsService.add(this.form.value).subscribe(() => {
                this.closeDialog();
                console.log(this.form.value);
            });
        if (this.pageType === 'edit')
            this.clientsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
