import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import {
    SubmitButtonsComponent,
    PrimeInputTextComponent,
    PrimeAutoCompleteComponent,
    PrimeCheckBoxComponent,
    PrimeDatepickerComponent,
    ItemItemUnitsService
} from '../../../../shared';
import { BaseEditComponent } from '../../../../base/components/base-edit-component';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-add-edit-item-item-unit',
    standalone: true,
    imports: [CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent, PrimeCheckBoxComponent, PrimeDatepickerComponent],
    templateUrl: './add-edit-item-item-unit.component.html',
    styleUrl: './add-edit-item-item-unit.component.scss'
})
export class AddEditItemItemUnitComponent extends BaseEditComponent implements OnInit {
    touristMarinaId = '';
    selectedOrganization: any;
    filteredOrganizations: any[] = [];
    itemItemUnitsService: ItemItemUnitsService = inject(ItemItemUnitsService);
    dialogService: DialogService = inject(DialogService);

    constructor(override activatedRoute: ActivatedRoute) {
        super(activatedRoute);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.dialogService.dialogComponentRefMap.forEach((element) => {
            this.pageType = element.instance.ddconfig.data.pageType;
            this.touristMarinaId = element.instance.ddconfig.data.row.touristMarinaId;
            if (this.pageType === 'edit') {
                this.id = element.instance.ddconfig.data.row.rowData.id;
            }
        });
        if (this.pageType === 'edit') {
            this.getEditMarinaOrganization();
        } else {
            this.initFormGroup();
        }
    }

    initFormGroup() {
        this.form = this.fb.group({
            id: [''],
            organizationId: ['', Validators.required],
            touristMarinaId: [this.touristMarinaId, Validators.required],
            licenseNumber: ['', Validators.required],
            fromDate: ['', Validators.required],
            toDate: ['', Validators.required],
            isActive: [false]
        });
    }


    //   getOrganizations(event: any) {
    //     const query = event.query.toLowerCase();
    //     this.organizationsService.organizations.subscribe({
    //         next: (res) => {
    //             this.filteredOrganizations= res.filter((organizations: any) => (organizations.nameAr.toLowerCase().includes(query) || organizations.nameEn.toLowerCase().includes(query)) &&(organizations.organizationType.code=="OwnerCompany"));
    //         },
    //         error: (err) => {
    //             this.alert.error('خطأ فى جلب الاحداث');
    //         }
    //     });
    // }
    onOrganizationSelect(event: any) {
        this.selectedOrganization = event.value;
        this.form.get('organizationId')?.setValue(this.selectedOrganization?.id);
    }

  getEditMarinaOrganization = () => {
    this.itemItemUnitsService.getEditItemItemUnit(this.id()).subscribe((MarinaOrganization: any) => {
            this.initFormGroup();
            this.form.patchValue(MarinaOrganization);
            //  this.fetchOrganizationDetails(MarinaOrganization); // this.fetchOrganizationDetails(MarinaOrganization.organizationId);
        });
    };

  

    //  fetchOrganizationDetails(MarinaOrganization: any) {
    //     this.organizationsService.organizations.subscribe((response: any) => {
    //         this.filteredOrganizations = Array.isArray(response) ? response : response.data || [];
    //         this.selectedOrganization = this.filteredOrganizations.find((organization: any) => organization.id === MarinaOrganization.organizationId);
    //         this.form.get('organizationsService')?.setValue(this.selectedOrganization.id);
    //     });
    // }

    submit() {
        if (this.pageType === 'add')
            this.itemItemUnitsService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.itemItemUnitsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
