import { Component, inject, OnInit } from '@angular/core';
import { BaseEditComponent } from '../../../../../base/components/base-edit-component';
import { TranslateModule } from '@ngx-translate/core';
import { CardModule } from 'primeng/card';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegionsService, PrimeInputTextComponent, SubmitButtonsComponent, PrimeAutoCompleteComponent, CitiesService } from '../../../../../shared';
import { DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-add-edit-regions',
    standalone: true,
    imports: [TranslateModule, CardModule, FormsModule, ReactiveFormsModule, SubmitButtonsComponent, PrimeInputTextComponent, PrimeAutoCompleteComponent],
    templateUrl: './add-edit-regions.component.html',
    styleUrl: './add-edit-regions.component.scss'
})
export class AddEditRegionsComponent extends BaseEditComponent implements OnInit {
    selectedCity: any;
    filteredCities: any[] = [];
    regionsService: RegionsService = inject(RegionsService);
    citiesService: CitiesService = inject(CitiesService);
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
            this.getEditRegions();
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
            cityId: [null, Validators.required]
        });
    }

    getEditRegions = () => {
        this.regionsService.getEditRegions(this.id).subscribe((region: any) => {
            this.initFormGroup();
            this.form.patchValue(region);
            this.fetchCityDetails(region);
        });
    };

    getCities(event: any) {
        const query = event.query.toLowerCase();
        this.citiesService.cities.subscribe({
            next: (res: any) => {
                this.filteredCities = res.filter((city: any) => city.nameAr.toLowerCase().includes(query) || city.nameEn.toLowerCase().includes(query));
            },
            error: (err) => {
                this.alert.error('خطأ فى جلب بيانات المدينة');
            }
        });
    }

    onCitySelect(event: any) {
        this.selectedCity = event.value;
        this.form.get('cityId')?.setValue(this.selectedCity.id);
    }

    fetchCityDetails(region: any) {
        this.citiesService.cities.subscribe((response: any) => {
            this.filteredCities = Array.isArray(response) ? response : response.data || [];
            console.log('');
            this.selectedCity = this.filteredCities.find((city: any) => city.id === region.cityId);
            this.form.get('cityId')?.setValue(this.selectedCity?.id);
        });
    }
    submit() {
        if (this.pageType === 'add')
            this.regionsService.add(this.form.value).subscribe(() => {
                this.closeDialog();
            });
        if (this.pageType === 'edit')
            this.regionsService.update({ id: this.id, ...this.form.value }).subscribe(() => {
                this.closeDialog();
            });
    }

    closeDialog() {
        this.dialogService.dialogComponentRefMap.forEach((dialog) => {
            dialog.destroy();
        });
    }
}
