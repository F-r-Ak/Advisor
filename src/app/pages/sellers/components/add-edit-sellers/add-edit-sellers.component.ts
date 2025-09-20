import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    SellerCategoryService,
    DealerTypesService,
    ItemPricingService,
    PaymentTermsService,
    PrimeAutoCompleteComponent,
    PrimeCheckBoxComponent,
    PrimeInputTextComponent,
    PrimeRadioButtonComponent,
    RegionsService,
    SellersService,
    SubmitButtonsComponent,
    ClientsService
} from '../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';
import { EnumDto } from '../../../../shared/interfaces';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-add-edit-sellers',
    standalone: true,
    imports: [JsonPipe, TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeCheckBoxComponent, PrimeRadioButtonComponent],
    templateUrl: './add-edit-sellers.component.html',
    styleUrl: './add-edit-sellers.component.scss'
})
export class AddEditSellersComponent extends BaseEditComponent implements OnInit {
    selectedSellerCategory: any;
    selectedRegion: any;
    selectedClient: any;
    selectedPaymentTerm: any;
    selectedDealerType: any;

    filteredSellerCategories: any[] = [];
    filteredRegions: any[] = [];
    filteredClients: any[] = [];
    dealerTypes: EnumDto[] = [];
    paymentTerms: EnumDto[] = [];

    // services
    sellersService: SellersService = inject(SellersService);
    sellerCategoryService: SellerCategoryService = inject(SellerCategoryService);
    regionsService: RegionsService = inject(RegionsService);
    dealerTypesService: DealerTypesService = inject(DealerTypesService);
    paymentTermsService: PaymentTermsService = inject(PaymentTermsService);
    clientsService: ClientsService = inject(ClientsService);
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
            this.getEditSeller();
        } else {
            this.initFormGroup();
        }
        this.getDealerTypes();
        this.getPaymentTerms();
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
            sellerCategoryId: [null, Validators.required],
            regionId: [null, Validators.required],
            dealerType: [null, Validators.required],
            openingBalance: [0, Validators.required],
            paymentTerms: [null, Validators.required],
            maxDebt: [0, Validators.required],
            isActive: [false],
            clientId: [null]
        });
    }

    getSellerCategories(event: any) {
        const query = event.query.toLowerCase();
        this.sellerCategoryService.sellerCategory.subscribe({
            next: (res: any) => {
                this.filteredSellerCategories = res.filter((sellerCategory: any) => sellerCategory.nameAr.toLowerCase().includes(query) || sellerCategory.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات فئة المورد');
            }
        });
    }

    onSellerCategorySelect(event: any) {
        this.selectedSellerCategory = event.value;
        this.form.get('sellerCategoryId')?.setValue(this.selectedSellerCategory.id);
    }

    getDealerTypes() {
        this.dealerTypesService.dealerTypes.subscribe({
            next: (res) => {
                this.dealerTypes = res;
                console.log('  this.dealerTypes', this.dealerTypes);
            },
            error: (err) => {
                this.alert.error(this.localize.translate.instant('خطأ في جلب البيانات'));
            }
        });
    }

    getPaymentTerms() {
        this.paymentTermsService.paymentTerms.subscribe({
            next: (res) => {
                this.paymentTerms = res;
            },
            error: (err) => {
                this.alert.error(this.localize.translate.instant('خطأ في جلب بيانات شروط الدفع'));
            }
        });
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

    getClients(event: any) {
        const query = event.query.toLowerCase();
        this.clientsService.clients.subscribe({
            next: (res: any) => {
                this.filteredClients = res.filter((client: any) => client.nameAr.toLowerCase().includes(query) || client.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات تسعير البيع');
            }
        });
    }

    onClientSelect(event: any) {
        this.selectedClient = event.value;
        this.form.get('clientId')?.setValue(this.selectedClient.id);
    }

    fetchSellerCategoryDetails(seller: any) {
        this.sellerCategoryService.sellerCategory.subscribe({
            next: (response: any) => {
                this.filteredSellerCategories = Array.isArray(response) ? response : response.data || [];
                this.selectedSellerCategory = this.filteredSellerCategories.find((sellerCategory: any) => sellerCategory.id === seller.sellerCategoryId);
                this.form.get('sellerCategoryId')?.setValue(this.selectedSellerCategory?.id);
            }
        });
    }

    fetchRegionDetails(seller: any) {
        this.regionsService.regions.subscribe({
            next: (response: any) => {
                this.filteredRegions = Array.isArray(response) ? response : response.data || [];
                this.selectedRegion = this.filteredRegions.find((region: any) => region.id === seller.regionId);
                this.form.get('regionId')?.setValue(this.selectedRegion?.id);
            }
        });
    }

    fetchPaymentTypeDetails(seller: any) {
        this.paymentTermsService.paymentTerms.subscribe((response: any) => {
            this.paymentTerms = Array.isArray(response) ? response : response.data || [];
            this.selectedPaymentTerm = this.paymentTerms.find((paymentTerm: any) => paymentTerm.nameEn === seller.paymentTerms);
            this.form.get('paymentTerms')?.setValue(this.selectedPaymentTerm.id);
        });
    }

    fetchDealrTypeDetails(seller: any) {
        this.dealerTypesService.dealerTypes.subscribe((response: any) => {
            this.dealerTypes = Array.isArray(response) ? response : response.data || [];
            this.selectedDealerType = this.dealerTypes.find((dealerTypes: any) => dealerTypes.nameEn === seller.dealerType);
            this.form.get('dealerType')?.setValue(this.selectedDealerType?.id);
        });
    }

    getEditSeller = () => {
        this.sellersService.getEditseller(this.id).subscribe((seller: any) => {
            this.initFormGroup();
            this.form.patchValue(seller);
            this.fetchSellerCategoryDetails(seller);
            this.fetchRegionDetails(seller);
            this.fetchPaymentTypeDetails(seller); // استدعاء شروط الدفع
            this.fetchDealrTypeDetails(seller);
        });
    };

    submit() {
        if (this.pageType === 'add')
            this.sellersService.add(this.form.value).subscribe(() => {
                this.closeDialog();
                console.log(this.form.value);
            });
        if (this.pageType === 'edit')
            this.sellersService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
